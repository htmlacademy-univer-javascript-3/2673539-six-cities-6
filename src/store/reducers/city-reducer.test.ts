import citySlice, { changeCity } from './city-slice';
import { CitiesEnum } from '../../const';

describe('City Slice', () => {
  const initialState = {
    city: {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3702,
        longitude: 4.8952,
        zoom: 13,
      },
    },
  };

  test('should return initial state with default reducer', () => {
    const result = citySlice(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('should handle changeCity action', () => {
    const newCity = {
      name: CitiesEnum.Paris,
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      },
    };

    const action = changeCity(newCity);
    const result = citySlice(initialState, action);

    expect(result.city).toEqual(newCity);
    expect(result.city.name).toBe(CitiesEnum.Paris);
    expect(result.city.location.latitude).toBe(48.8566);
    expect(result.city.location.longitude).toBe(2.3522);
    expect(result.city.location.zoom).toBe(13);
  });

  test('should not mutate state when changing city', () => {
    const newCity = {
      name: CitiesEnum.Cologne,
      location: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 12,
      },
    };

    const action = changeCity(newCity);
    const result = citySlice(initialState, action);

    expect(result).not.toBe(initialState);
    expect(initialState.city.name).toBe(CitiesEnum.Amsterdam);
    expect(result.city.name).toBe(CitiesEnum.Cologne);
  });

  test('should create correct action creators', () => {
    const testCity = {
      name: CitiesEnum.Brussels,
      location: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 14,
      },
    };

    const expectedAction = {
      type: 'city/changeCity',
      payload: testCity,
    };

    const action = changeCity(testCity);

    expect(action).toEqual(expectedAction);
    expect(action.type).toBe('city/changeCity');
    expect(action.payload).toBe(testCity);
  });

  test('should handle changeCity with different city from SixCities', () => {
    const testCities = [
      {
        name: CitiesEnum.Hamburg,
        location: { latitude: 53.5511, longitude: 9.9937, zoom: 13 },
      },
      {
        name: CitiesEnum.Dusseldorf,
        location: { latitude: 51.2277, longitude: 6.7735, zoom: 13 },
      },
    ];

    testCities.forEach((testCity) => {
      const action = changeCity(testCity);
      const result = citySlice(initialState, action);

      expect(result.city.name).toBe(testCity.name);
      expect(result.city.location.latitude).toBe(testCity.location.latitude);
      expect(result.city.location.longitude).toBe(testCity.location.longitude);
      expect(result.city.location.zoom).toBe(testCity.location.zoom);
    });
  });

  test('should maintain state structure after multiple changes', () => {
    const city1 = {
      name: CitiesEnum.Paris,
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 13 },
    };

    const city2 = {
      name: CitiesEnum.Amsterdam,
      location: { latitude: 52.3702, longitude: 4.8952, zoom: 13 },
    };

    let state = initialState;

    state = citySlice(state, changeCity(city1));
    expect(state.city).toEqual(city1);

    state = citySlice(state, changeCity(city2));
    expect(state.city).toEqual(city2);
  });
});
