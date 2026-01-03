import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import FavoritesList from './favorites-list';
import { OfferCardType } from '../../types/offer';
import { CitiesEnum } from '../../const';
import { RootState } from '../../store';
import { createRandomOffer } from '../../utils/create-random-offer';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderWithProviders = (
  component: React.ReactNode,
  store: MockStoreEnhanced<RootState, DispatchExts>
) => render(
  <Provider store={store}>
    <BrowserRouter>
      {component}
    </BrowserRouter>
  </Provider>
);

const createMockOfferWithCity = (cityName: CitiesEnum, isFavorite: boolean): OfferCardType => ({
  ...createRandomOffer(),
  city: {
    ...createRandomOffer().city,
    name: cityName,
  },
  isFavorite,
});

describe('FavoritesList Component', () => {
  const createStore = () => mockStore({
    userState: { authorizationStatus: 'AUTH' },
  } as unknown as RootState);

  test('renders empty list when no favorite offers', () => {
    const store = createStore();
    const { container } = renderWithProviders(<FavoritesList offers={[]} />, store);

    const favoritesList = container.querySelector('.favorites__list');
    expect(favoritesList).toBeInTheDocument();
    expect(favoritesList?.children).toHaveLength(0);
  });

  test('renders correct number of cards per city', () => {
    const offers = [
      createMockOfferWithCity(CitiesEnum.Paris, true),
      createMockOfferWithCity(CitiesEnum.Paris, true),
      createMockOfferWithCity(CitiesEnum.Amsterdam, true),
    ];

    const store = createStore();
    const { container } = renderWithProviders(<FavoritesList offers={offers} />, store);

    // Проверяем общее количество карточек
    const cards = container.querySelectorAll('.place-card');
    expect(cards).toHaveLength(3);

    // Проверяем, что Paris имеет 2 карточки
    const parisSection = Array.from(container.querySelectorAll('.favorites__locations-items')).find(
      (item) => item.querySelector('h2')?.textContent === 'Paris'
    );
    const parisCards = parisSection?.querySelectorAll('.place-card');
    expect(parisCards).toHaveLength(2);
  });

  test('renders correct CSS classes', () => {
    const offers = [createMockOfferWithCity(CitiesEnum.Paris, true)];
    const store = createStore();
    const { container } = renderWithProviders(<FavoritesList offers={offers} />, store);

    const expectedClasses = [
      'favorites__list',
      'favorites__locations-items',
      'favorites__locations',
      'locations',
      'locations--current',
      'locations__item',
      'locations__item-link',
      'favorites__places',
    ];

    expectedClasses.forEach((className) => {
      const element = container.querySelector(`.${className}`);
      expect(element).toBeInTheDocument();
    });
  });
});
