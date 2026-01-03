import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';

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

describe('Header Component', () => {
  const mockUserData = {
    email: 'test@example.com',
    name: 'Test User',
    avatarUrl: 'avatar.jpg',
    isPro: false,
  };

  const createStore = (authStatus = AuthorizationStatus.NoAuth, favoritesCount = 0) => mockStore({
    userState: {
      authorizationStatus: authStatus,
      userData: authStatus === AuthorizationStatus.Auth ? mockUserData : null,
      favoriteOffers: Array(favoritesCount).fill({ id: '1', title: 'Test Offer' }),
    },
  } as unknown as RootState);

  test('renders header with correct structure', () => {
    const store = createStore();
    renderWithProviders(<Header />, store);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  test('renders logo that navigates to home page', () => {
    const store = createStore();
    renderWithProviders(<Header />, store);

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('header__logo-link');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('renders logo image with correct attributes', () => {
    const store = createStore();
    renderWithProviders(<Header />, store);

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('header__logo');
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '81');
    expect(logoImage).toHaveAttribute('height', '41');
  });

  test('shows sign in link for non-authorized user', () => {
    const store = createStore(AuthorizationStatus.NoAuth);
    renderWithProviders(<Header />, store);

    const signInLink = screen.getByRole('link', { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
    expect(signInLink).toHaveClass('header__nav-link');
  });

  test('shows user email and sign out for authorized user', () => {
    const store = createStore(AuthorizationStatus.Auth, 3);
    renderWithProviders(<Header />, store);

    const userEmail = screen.getByText('test@example.com');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveClass('header__user-name');

    const favoriteCount = screen.getByText('3');
    expect(favoriteCount).toBeInTheDocument();
    expect(favoriteCount).toHaveClass('header__favorite-count');

    const signOutButton = screen.getByText('Sign out');
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveClass('header__signout');
  });

  test('renders avatar wrapper for authorized user', () => {
    const store = createStore(AuthorizationStatus.Auth);
    renderWithProviders(<Header />, store);

    const avatarWrapper = document.querySelector('.header__avatar-wrapper');
    expect(avatarWrapper).toBeInTheDocument();
    expect(avatarWrapper).toHaveClass('user__avatar-wrapper');
  });

  test('shows zero favorite count when no favorites', () => {
    const store = createStore(AuthorizationStatus.Auth, 0);
    renderWithProviders(<Header />, store);

    const favoriteCount = screen.getByText('0');
    expect(favoriteCount).toBeInTheDocument();
    expect(favoriteCount).toHaveClass('header__favorite-count');
  });

  test('does not show user info for non-authorized user', () => {
    const store = createStore(AuthorizationStatus.NoAuth);
    renderWithProviders(<Header />, store);

    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  test('renders navigation with correct semantic structure', () => {
    const store = createStore();
    const { container } = renderWithProviders(<Header />, store);

    const navElement = container.querySelector('nav');
    expect(navElement).toBeInTheDocument();
    expect(navElement).toHaveClass('header__nav');

    const listElement = navElement?.querySelector('ul');
    expect(listElement).toBeInTheDocument();
    expect(listElement).toHaveClass('header__nav-list');
  });

  test('user item has pointer cursor style', () => {
    const store = createStore(AuthorizationStatus.Auth);
    renderWithProviders(<Header />, store);

    const userItem = screen.getByText('test@example.com').closest('.header__nav-item');
    expect(userItem).toHaveStyle('cursor: pointer');
  });

  test('sign out item has pointer cursor style', () => {
    const store = createStore(AuthorizationStatus.Auth);
    renderWithProviders(<Header />, store);

    const signOutItem = screen.getByText('Sign out').closest('.header__nav-item');
    expect(signOutItem).toHaveStyle('cursor: pointer');
  });

  test('matches snapshot for authorized user', () => {
    const store = createStore(AuthorizationStatus.Auth, 2);
    const { container } = renderWithProviders(<Header />, store);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot for non-authorized user', () => {
    const store = createStore(AuthorizationStatus.NoAuth);
    const { container } = renderWithProviders(<Header />, store);
    expect(container).toMatchSnapshot();
  });
});
