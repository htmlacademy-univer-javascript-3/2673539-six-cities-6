import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './card';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AuthorizationStatus } from '../../const';
import { createRandomOffer } from '../../utils/create-random-offer';
import { RootState } from '../../store';
import { changeFavoriteAction } from '../../store/api-actions';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderWithStore = (store: MockStoreEnhanced<RootState, DispatchExts>, component: React.ReactNode) =>
  render(<Provider store={store}>{component}</Provider>);

describe('Card Component', () => {
  test('renders offer card correctly', () => {
    const offer = createRandomOffer();
    const store = mockStore({
      userState: { authorizationStatus: AuthorizationStatus.NoAuth, favoriteOffers: [] },
    } as unknown as RootState);

    renderWithStore(
      store,
      <BrowserRouter>
        <Card offer={offer} />
      </BrowserRouter>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();

    if (offer.isPremium) {
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }
  });

  test('favorite button has correct state', () => {
    const offer = createRandomOffer();
    offer.isFavorite = false;
    const store = mockStore({
      userState: { authorizationStatus: AuthorizationStatus.Auth, favoriteOffers: [] },
    } as unknown as RootState);

    renderWithStore(
      store,
      <BrowserRouter>
        <Card offer={offer} />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('place-card__bookmark-button');
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
  });

  test('calls changeFavoriteAction when authorized', () => {
    const offer = createRandomOffer();
    offer.isFavorite = false;

    const store = mockStore({
      userState: { authorizationStatus: AuthorizationStatus.Auth, favoriteOffers: [] },
    } as unknown as RootState);

    renderWithStore(
      store,
      <BrowserRouter>
        <Card offer={offer} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    type ChangeFavoritePendingAction = ReturnType<typeof changeFavoriteAction.pending>;
    const actions = store.getActions() as ChangeFavoritePendingAction[];

    const pendingAction = actions.find(
      (action) =>
        action.type === changeFavoriteAction.pending.type &&
        action.meta.arg.offerId === offer.id &&
        action.meta.arg.status === 1
    );

    expect(pendingAction).toBeDefined();
  });

  test('navigates to login when not authorized', () => {
    const offer = createRandomOffer();
    const store = mockStore({
      userState: { authorizationStatus: AuthorizationStatus.NoAuth, favoriteOffers: [] },
    } as unknown as RootState);

    renderWithStore(
      store,
      <BrowserRouter>
        <Card offer={offer} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button'));
  });
});
