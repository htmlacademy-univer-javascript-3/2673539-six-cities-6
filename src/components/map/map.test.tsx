import { render } from '@testing-library/react';
import { CityType, OfferInMap } from '../../types/offer';
import Map from './map';
import { CitiesEnum } from '../../const';

describe('MapComponent - Basic Tests', () => {
  const mockCity: CityType = {
    name: CitiesEnum.Paris,
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13,
    },
  };

  const mockOffers: OfferInMap[] = [
    {
      id: '1',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 13,
      },
    },
  ];

  test('renders map container div', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        currentOffer={undefined}
      />
    );

    const mapContainer = container.firstChild as HTMLDivElement;
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer.tagName).toBe('DIV');
  });

  test('container has full width and height styles', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        currentOffer={undefined}
      />
    );

    const mapContainer = container.firstChild as HTMLDivElement;
    expect(mapContainer).toHaveStyle('height: 100%');
    expect(mapContainer).toHaveStyle('width: 100%');
  });

  test('container has correct React ref prop', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        currentOffer={undefined}
      />
    );

    const mapContainer = container.firstChild as HTMLDivElement;
    // Можно проверить, что элемент существует и имеет правильные стили
    expect(mapContainer).toBeDefined();
    expect(mapContainer.style.height).toBe('100%');
    expect(mapContainer.style.width).toBe('100%');
  });

  test('matches snapshot', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        currentOffer={undefined}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
