import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import NearOffersList from './near-offers-list';
import { OfferCardType } from '../../types/offer';
import { createRandomOffer } from '../../utils/create-random-offer';
import { RootState } from '../../store';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderNearOffersList = (offers: OfferCardType[]) => {
  const store = mockStore({
    userState: { authorizationStatus: 'NO_AUTH', favoriteOffers: [] },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <NearOffersList offers={offers} />
      </BrowserRouter>
    </Provider>
  );
};

describe('NearOffersList Component', () => {
  const createMockOffer = (): OfferCardType => createRandomOffer();

  test('renders section with correct class', () => {
    renderNearOffersList([]);

    const sectionElement = document.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('near-places', 'places');
  });

  test('renders title with correct text', () => {
    renderNearOffersList([]);

    const titleElement = screen.getByRole('heading', { level: 2 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('near-places__title');
    expect(titleElement.textContent).toBe('Other places in the neighbourhood');
  });

  test('renders list container with correct class', () => {
    const { container } = renderNearOffersList([]);

    const listContainer = container.querySelector('.near-places__list');
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveClass('places__list');
  });

  test('renders correct number of Card components', () => {
    const offers = [createMockOffer(), createMockOffer(), createMockOffer()];

    const { container } = renderNearOffersList(offers);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(3);
  });

  test('renders no cards when offers array is empty', () => {
    const { container } = renderNearOffersList([]);

    const cardElements = container.querySelectorAll('.place-card');
    expect(cardElements).toHaveLength(0);
  });

  test('renders title even with no offers', () => {
    renderNearOffersList([]);

    const titleElement = screen.getByText('Other places in the neighbourhood');
    expect(titleElement).toBeInTheDocument();
  });

  test('section element exists', () => {
    const { container } = renderNearOffersList([]);

    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement?.tagName).toBe('SECTION');
  });

  test('matches snapshot with empty offers', () => {
    const { container } = renderNearOffersList([]);
    expect(container).toMatchSnapshot();
  });
});
