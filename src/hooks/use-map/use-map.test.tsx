import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { CityType } from '../../types/offer';
import { CitiesEnum } from '../../const';

describe('useMap hook', () => {
  const mockCity: CityType = {
    name: CitiesEnum.Paris,
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13,
    },
  };

  test('returns null initially when mapRef is null', () => {
    const { result } = renderHook(() => {
      const mapRef = { current: null };
      return useMap(mapRef, mockCity);
    });

    expect(result.current).toBeNull();
  });

  test('hook creates map with correct city coordinates', () => {
    const mockDiv = document.createElement('div');
    mockDiv.style.height = '500px';
    mockDiv.style.width = '500px';
    document.body.appendChild(mockDiv);

    const { result } = renderHook(() => {
      const mapRef = { current: mockDiv };
      return useMap(mapRef, mockCity);
    });

    const mapInstance = result.current;
    expect(mapInstance).toBeDefined();

    const center = mapInstance?.getCenter();
    expect(center?.lat).toBe(mockCity.location.latitude);
    expect(center?.lng).toBe(mockCity.location.longitude);

    document.body.removeChild(mockDiv);
  });

  test('hook creates map with default zoom level', () => {
    const mockDiv = document.createElement('div');
    mockDiv.style.height = '500px';
    mockDiv.style.width = '500px';
    document.body.appendChild(mockDiv);

    const { result } = renderHook(() => {
      const mapRef = { current: mockDiv };
      return useMap(mapRef, mockCity);
    });

    const mapInstance = result.current;
    expect(mapInstance).toBeDefined();

    const zoom = mapInstance?.getZoom();
    expect(zoom).toBe(10);

    document.body.removeChild(mockDiv);
  });

  test('hook only creates map once (isRenderedRef prevents re-creation)', () => {
    const mockDiv = document.createElement('div');
    mockDiv.style.height = '500px';
    mockDiv.style.width = '500px';
    document.body.appendChild(mockDiv);

    const { result, rerender } = renderHook(
      ({ city }) => {
        const mapRef = { current: mockDiv };
        return useMap(mapRef, city);
      },
      { initialProps: { city: mockCity } }
    );

    const firstMapInstance = result.current;
    expect(firstMapInstance).toBeDefined();

    const newCity: CityType = {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 13,
      },
    };

    rerender({ city: newCity });

    const secondMapInstance = result.current;
    expect(secondMapInstance).toBe(firstMapInstance);

    document.body.removeChild(mockDiv);
  });

  test('hook works with different city data', () => {
    const mockDiv = document.createElement('div');
    mockDiv.style.height = '500px';
    mockDiv.style.width = '500px';
    document.body.appendChild(mockDiv);

    const amsterdamCity: CityType = {
      name: CitiesEnum.Amsterdam,
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 13,
      },
    };

    const { result } = renderHook(() => {
      const mapRef = { current: mockDiv };
      return useMap(mapRef, amsterdamCity);
    });

    const mapInstance = result.current;
    expect(mapInstance).toBeDefined();

    const center = mapInstance?.getCenter();
    expect(center?.lat).toBe(amsterdamCity.location.latitude);
    expect(center?.lng).toBe(amsterdamCity.location.longitude);

    document.body.removeChild(mockDiv);
  });
});
