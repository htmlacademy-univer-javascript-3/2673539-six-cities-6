import { render, screen } from '@testing-library/react';
import App from './app';
import { withStore } from '../utils/mock-component';
import { AppRoute, AuthorizationStatus, SixCities } from '../const';

describe('Application Routing', () => {
  test('should render Spinner when offers are loading', () => {
    const { withStoreComponent } = withStore(
      <App />,
      {
        offersState: {
          isOffersDataLoading: true,
          offers: [],
        },
        cityState: {
          city: SixCities[0],
        },
        userState: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(document.querySelector('.spinner-container')).toBeInTheDocument();
  });

  test('should render Main page on root route', () => {
    window.history.pushState({}, '', AppRoute.Root);

    const { withStoreComponent } = withStore(
      <App />,
      {
        offersState: {
          isOffersDataLoading: false,
          offers: [],
        },
        cityState: {
          city: SixCities[0],
        },
        userState: {
          authorizationStatus: AuthorizationStatus.Auth,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(/cities/i)).toBeInTheDocument();
  });

  test('should render Login page on /login route', () => {
    window.history.pushState({}, '', AppRoute.Login);

    const { withStoreComponent } = withStore(
      <App />,
      {
        offersState: {
          isOffersDataLoading: false,
          offers: [],
        },
        cityState: {
          city: SixCities[0],
        },
        userState: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  test('should render NotFound page for unknown route', () => {
    window.history.pushState({}, '', '/unknown-route');

    const { withStoreComponent } = withStore(
      <App />,
      {
        offersState: {
          isOffersDataLoading: false,
          offers: [],
        },
        cityState: {
          city: SixCities[0],
        },
        userState: {
          authorizationStatus: AuthorizationStatus.Auth,
          favoriteOffers: [],
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
