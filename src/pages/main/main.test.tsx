import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Main from './main';
import { RootState } from '../../store';
import { createRandomOffer } from '../../utils/create-random-offer';
import { CitiesEnum } from '../../const';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderMain = (offersCount = 0, cityName = CitiesEnum.Paris) => {
  const offers = Array(offersCount)
    .fill(null)
    .map(() => {
      const offer = createRandomOffer();
      return {
        ...offer,
        city: {
          ...offer.city,
          name: cityName,
        },
      };
    });

  const store = mockStore({
    cityState: {
      city: {
        name: cityName,
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 13,
        },
      },
    },
    offersState: {
      offers,
    },
    userState: {
      authorizationStatus: 'NO_AUTH',
    },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

describe('Main Component', () => {
  test('renders page with correct classes', () => {
    const { container } = renderMain();

    const pageContainer = container.querySelector('.page');
    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveClass('page--gray', 'page--main');
  });

  test('renders Header component', () => {
    const { container } = renderMain();

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  test('renders main section with correct classes', () => {
    const { container } = renderMain();

    const mainElement = container.querySelector('.page__main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main--index');
  });

  test('renders CitiesTabs component', () => {
    const { container } = renderMain();

    const tabsElement = container.querySelector('.tabs');
    expect(tabsElement).toBeInTheDocument();
  });

  test('renders offers container when there are offers', () => {
    const { container } = renderMain(3);

    const citiesContainer = container.querySelector('.cities');
    expect(citiesContainer).toBeInTheDocument();

    const placesContainer = container.querySelector('.cities__places-container');
    expect(placesContainer).toBeInTheDocument();
    expect(placesContainer).toHaveClass('container');
  });

  test('renders places found text', () => {
    const { container } = renderMain(2);

    const placesFound = container.querySelector('.places__found');
    expect(placesFound).toBeInTheDocument();
    expect(placesFound?.textContent).toContain('2 places to stay');
  });

  test('renders SortingOptions component when there are offers', () => {
    const { container } = renderMain(1);

    const sortingOptions = container.querySelector('.places__sorting');
    expect(sortingOptions).toBeInTheDocument();
  });

  test('renders OffersList component when there are offers', () => {
    const { container } = renderMain(1);

    const offersList = container.querySelector('.cities__places-list');
    expect(offersList).toBeInTheDocument();
  });

  test('renders Map component when there are offers', () => {
    const { container } = renderMain(1);

    const mapSection = container.querySelector('section[style*="width: 100%"]');
    expect(mapSection).toBeInTheDocument();

    const mapContainer = container.querySelector('div[style*="height: 100%"]');
    expect(mapContainer).toBeInTheDocument();
  });

  test('renders cities right section when there are offers', () => {
    const { container } = renderMain(1);

    const rightSection = container.querySelector('.cities__right-section');
    expect(rightSection).toBeInTheDocument();
  });

  test('shows correct city name in places found text', () => {
    const { container } = renderMain(3, CitiesEnum.Amsterdam);

    const placesFound = container.querySelector('.places__found');
    expect(placesFound?.textContent).toContain('Amsterdam');
  });

  test('renders cities__places section when there are offers', () => {
    const { container } = renderMain(2);

    const placesSection = container.querySelector('.cities__places');
    expect(placesSection).toBeInTheDocument();
    expect(placesSection).toHaveClass('places');
  });

  test('main element has correct structure with tabs and content', () => {
    const { container } = renderMain(2);

    const mainElement = container.querySelector('.page__main');
    const tabs = mainElement?.querySelector('.tabs');
    const content = mainElement?.querySelector('.cities');

    expect(tabs).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  test('renders all CSS classes correctly when there are offers', () => {
    const { container } = renderMain(1);

    const expectedClasses = [
      'page',
      'page--gray',
      'page--main',
      'header',
      'page__main',
      'page__main--index',
      'tabs',
      'cities',
      'cities__places-container',
      'container',
      'cities__places',
      'places',
      'places__found',
      'places__sorting',
      'cities__places-list',
      'cities__right-section',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('renders all CSS classes correctly when no offers', () => {
    const { container } = renderMain(0);

    const expectedClasses = [
      'page',
      'page--gray',
      'page--main',
      'header',
      'page__main',
      'page__main--index',
      'tabs',
      'cities',
      'cities__places-container',
      'cities__places-container--empty',
      'cities__no-places',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('matches snapshot with no offers', () => {
    const { container } = renderMain(0);
    expect(container).toMatchSnapshot();
  });
});
