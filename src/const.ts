import { CityType, LocationType } from './types/offer';

export enum AppRoute {
  Login = '/login',
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH'
}

export enum CitiesEnum {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

const locations: Record<CitiesEnum, LocationType> = {
  [CitiesEnum.Paris]: { latitude: 48.85661, longitude: 2.351499, zoom: 13 },
  [CitiesEnum.Cologne]: { latitude: 50.9375, longitude: 6.9603, zoom: 12 },
  [CitiesEnum.Brussels]: { latitude: 50.8503, longitude: 4.3517, zoom: 12 },
  [CitiesEnum.Amsterdam]: { latitude: 52.3676, longitude: 4.9041, zoom: 12 },
  [CitiesEnum.Hamburg]: { latitude: 53.5511, longitude: 9.9937, zoom: 12 },
  [CitiesEnum.Dusseldorf]: { latitude: 51.2277, longitude: 6.7735, zoom: 12 },
};

export const SixCities: CityType[] = Object.values(CitiesEnum).map(
  (cityName) => ({
    name: cityName as CitiesEnum,
    location: locations[cityName as CitiesEnum],
  })
);

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}
