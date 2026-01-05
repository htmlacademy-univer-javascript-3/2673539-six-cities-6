import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import CitiesTabs from './cities-tabs';
import { RootState } from '../../store';
import { changeCity } from '../../store/reducers/city-slice';
import { SixCities } from '../../const';
import { CitiesEnum } from '../../const';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderWithStore = (
  store: MockStoreEnhanced<RootState, DispatchExts>,
  component: React.ReactNode
) => render(<Provider store={store}>{component}</Provider>);

describe('CitiesTabs Component', () => {
  const mockCityState = {
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
  };

  const createStore = (cityState = mockCityState) =>
    mockStore({
      cityState,
    } as unknown as RootState);

  test('renders all cities from CitiesEnum', () => {
    const store = createStore();

    renderWithStore(store, <CitiesTabs />);

    const cityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

    cityNames.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  test('highlights current city with active class', () => {
    const store = createStore();

    renderWithStore(store, <CitiesTabs />);

    const currentCityButton = screen.getByText('Paris').closest('button');

    expect(currentCityButton).toHaveClass('tabs__item--active');

    const otherCities = ['Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
    otherCities.forEach((city) => {
      const button = screen.getByText(city).closest('button');
      expect(button).not.toHaveClass('tabs__item--active');
    });
  });

  test('dispatches changeCity action when city is clicked', () => {
    const store = createStore();

    renderWithStore(store, <CitiesTabs />);

    const amsterdamButton = screen.getByText('Amsterdam');
    fireEvent.click(amsterdamButton);

    const actions = store.getActions() as AnyAction[];

    const changeCityAction = actions.find(
      (action: AnyAction) => action.type === changeCity.type
    );

    expect(changeCityAction).toBeDefined();

    if (changeCityAction) {
      const cityData = SixCities.find((city) => city.name === CitiesEnum.Amsterdam);
      expect(changeCityAction.payload).toEqual(cityData);
    }
  });

  test('applies correct styling to active city', () => {
    const store = createStore();

    renderWithStore(store, <CitiesTabs />);

    const parisButton = screen.getByText('Paris').closest('button');

    expect(parisButton).toHaveStyle('background: ');

    const amsterdamButton = screen.getByText('Amsterdam').closest('button');
    expect(amsterdamButton).toHaveStyle('background: none');
  });

  test('renders hidden heading for accessibility', () => {
    const store = createStore();

    renderWithStore(store, <CitiesTabs />);

    const heading = screen.getByText('Cities');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('visually-hidden');
  });
});
