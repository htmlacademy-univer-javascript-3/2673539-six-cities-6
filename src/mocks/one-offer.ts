import { OfferType } from '../types/offer';

export const oneOffer: OfferType = {
  'id': 'bd85c58f-1d46-47c9-a22e-640be1690ff1',
  'title': 'The house among olive ',
  'description': 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  'type': 'apartment',
  'price': 177,
  'images': [
    'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
    'https://14.design.htmlacademy.pro/static/hotel/12.jpg'
  ],
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  'location': {
    'latitude': 48.868610000000004,
    'longitude': 2.342499,
    'zoom': 16
  },
  'goods': [
    'Kitchen',
    'Towels',
    'Wi-Fi',
    'Coffee machine',
    'Washing machine',
    'Cable TV'
  ],
  'host': {
    'isPro': true,
    'name': 'Angelina',
    'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
  },
  'isPremium': false,
  'isFavorite': false,
  'rating': 3,
  'bedrooms': 4,
  'maxAdults': 1
};
