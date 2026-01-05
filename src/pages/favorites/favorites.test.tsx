import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Favorites from './favorites';
import { RootState } from '../../store';
import { createRandomOffer } from '../../utils/create-random-offer';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderFavorites = (favoriteOffersCount = 0) => {
  const favoriteOffers = Array(favoriteOffersCount)
    .fill(null)
    .map(() => createRandomOffer());

  const store = mockStore({
    userState: {
      authorizationStatus: 'AUTH',
      favoriteOffers,
    },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    </Provider>
  );
};

describe('Favorites Component', () => {
  test('renders page container with correct class', () => {
    const { container } = renderFavorites();

    const pageContainer = container.querySelector('.page');
    expect(pageContainer).toBeInTheDocument();
  });

  test('renders Header component', () => {
    const { container } = renderFavorites();

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  test('renders Footer component', () => {
    const { container } = renderFavorites();

    const footerElement = container.querySelector('footer');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('footer');
  });

  test('renders FavoritesList when there are favorite offers', () => {
    const { container } = renderFavorites(3);

    const favoritesSection = container.querySelector('.favorites');
    expect(favoritesSection).toBeInTheDocument();
    expect(favoritesSection).not.toHaveClass('favorites--empty');

    const emptyFavoritesSection = container.querySelector('.favorites--empty');
    expect(emptyFavoritesSection).not.toBeInTheDocument();
  });

  test('renders favorites title when there are favorite offers', () => {
    const { container } = renderFavorites(2);

    const titleElement = container.querySelector('.favorites__title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toBe('Saved listing');
  });

  test('renders page__main--favorites class when there are favorite offers', () => {
    const { container } = renderFavorites(1);

    const mainElement = container.querySelector('.page__main--favorites');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders page__favorites-container when there are favorite offers', () => {
    const { container } = renderFavorites(1);

    const containerElement = container.querySelector('.page__favorites-container');
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass('container');
  });

  test('renders section.favorites when there are favorite offers', () => {
    const { container } = renderFavorites(1);

    const favoritesSection = container.querySelector('section.favorites');
    expect(favoritesSection).toBeInTheDocument();
  });

  test('page structure is correct with header, main and footer', () => {
    const { container } = renderFavorites();

    const pageDiv = container.querySelector('.page');
    expect(pageDiv).toBeInTheDocument();

    const header = pageDiv?.querySelector('header');
    expect(header).toBeInTheDocument();

    const main = pageDiv?.querySelector('main');
    expect(main).toBeInTheDocument();

    const footer = pageDiv?.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  test('matches snapshot with empty favorites', () => {
    const { container } = renderFavorites(0);
    expect(container).toMatchSnapshot();
  });

  test('renders all CSS classes correctly when there are favorites', () => {
    const { container } = renderFavorites(1);

    const expectedClasses = [
      'page',
      'header',
      'page__main',
      'page__main--favorites',
      'page__favorites-container',
      'container',
      'favorites',
      'favorites__title',
      'footer',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('renders all CSS classes correctly when no favorites', () => {
    const { container } = renderFavorites(0);

    const expectedClasses = [
      'page',
      'header',
      'page__main',
      'page__main--favorites',
      'page__main--favorites-empty',
      'page__favorites-container',
      'container',
      'favorites--empty',
      'footer',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
