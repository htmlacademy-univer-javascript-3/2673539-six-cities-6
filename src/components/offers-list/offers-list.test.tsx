import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import OffersList from './offers-list';
import { OfferCardType } from '../../types/offer';
import { CitiesEnum } from '../../const';
import { createRandomOffer } from '../../utils/create-random-offer';
import { RootState } from '../../store';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderOffersList = (
  offers: OfferCardType[],
  currentCity: CitiesEnum,
  onActiveOfferChange: (offerId: string | null) => void = () => { }
) => {
  const store = mockStore({
    userState: { authorizationStatus: 'NO_AUTH', favoriteOffers: [] },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <OffersList
          offers={offers}
          currentCity={currentCity}
          onActiveOfferChange={onActiveOfferChange}
        />
      </BrowserRouter>
    </Provider>
  );
};

describe('OffersList Component', () => {
  const createMockOfferWithCity = (city: CitiesEnum): OfferCardType => {
    const offer = createRandomOffer();
    return {
      ...offer,
      city: {
        ...offer.city,
        name: city,
      },
    };
  };

  test('renders list container with correct classes', () => {
    const { container } = renderOffersList([], CitiesEnum.Paris);

    const listContainer = container.querySelector('.cities__places-list');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveClass('places__list', 'tabs__content');
  });

  test('renders no cards when offers array is empty', () => {
    const { container } = renderOffersList([], CitiesEnum.Paris);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(0);
  });

  test('filters offers by current city', () => {
    const offers = [
      createMockOfferWithCity(CitiesEnum.Paris),
      createMockOfferWithCity(CitiesEnum.Paris),
      createMockOfferWithCity(CitiesEnum.Amsterdam),
      createMockOfferWithCity(CitiesEnum.Cologne),
    ];

    const { container } = renderOffersList(offers, CitiesEnum.Paris);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(2);
  });

  test('renders correct number of cards for current city', () => {
    const offers = [
      createMockOfferWithCity(CitiesEnum.Paris),
      createMockOfferWithCity(CitiesEnum.Paris),
      createMockOfferWithCity(CitiesEnum.Paris),
      createMockOfferWithCity(CitiesEnum.Amsterdam),
    ];

    const { container } = renderOffersList(offers, CitiesEnum.Paris);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(3);
  });

  test('calls onActiveOfferChange on mouse enter', () => {
    let capturedOfferId: string | null = null;
    const onActiveOfferChange = (offerId: string | null) => {
      capturedOfferId = offerId;
    };

    const offer = createMockOfferWithCity(CitiesEnum.Paris);
    const offers = [offer];

    const { container } = renderOffersList(
      offers,
      CitiesEnum.Paris,
      onActiveOfferChange
    );

    const cardElement = container.querySelector('.place-card');
    expect(cardElement).toBeInTheDocument();

    fireEvent.mouseEnter(cardElement!);
    expect(capturedOfferId).toBe(offer.id);
  });

  test('calls onActiveOfferChange with null on mouse leave', () => {
    let capturedOfferId: string | null = null;
    const onActiveOfferChange = (offerId: string | null) => {
      capturedOfferId = offerId;
    };

    const offer = createMockOfferWithCity(CitiesEnum.Paris);
    const offers = [offer];

    const { container } = renderOffersList(
      offers,
      CitiesEnum.Paris,
      onActiveOfferChange
    );

    const cardElement = container.querySelector('.place-card');
    expect(cardElement).toBeInTheDocument();

    fireEvent.mouseLeave(cardElement!);
    expect(capturedOfferId).toBe(null);
  });

  test('does not render cards for different city', () => {
    const offers = [
      createMockOfferWithCity(CitiesEnum.Amsterdam),
      createMockOfferWithCity(CitiesEnum.Cologne),
    ];

    const { container } = renderOffersList(offers, CitiesEnum.Paris);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(0);
  });

  test('matches snapshot with empty offers', () => {
    const { container } = renderOffersList([], CitiesEnum.Paris);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with offers for different city', () => {
    const offers = [
      createMockOfferWithCity(CitiesEnum.Amsterdam),
      createMockOfferWithCity(CitiesEnum.Cologne),
    ];

    const { container } = renderOffersList(offers, CitiesEnum.Paris);
    expect(container).toMatchSnapshot();
  });

  test('renders all CSS classes correctly', () => {
    const { container } = renderOffersList([], CitiesEnum.Paris);

    const listContainer = container.querySelector('.cities__places-list');
    expect(listContainer).toHaveClass('cities__places-list');
    expect(listContainer).toHaveClass('places__list');
    expect(listContainer).toHaveClass('tabs__content');
  });
});
