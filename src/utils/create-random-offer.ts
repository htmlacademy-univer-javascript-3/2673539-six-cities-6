import { OfferCardType } from '../types/offer.ts';
import faker from 'faker';
import { SixCities } from '../const.ts';

export function createRandomOffer(): OfferCardType {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(2),
    type: faker.random.arrayElement(['apartment', 'room', 'house', 'hotel']),
    price: faker.datatype.number({ min: 50, max: 500 }),
    previewImage: faker.image.imageUrl(),
    city: {
      name: faker.random.arrayElement(Object.values(SixCities)).name,
      location: {
        latitude: parseFloat(faker.address.latitude()),
        longitude: parseFloat(faker.address.longitude()),
        zoom: faker.datatype.number({ min: 10, max: 15 }),
      },
    },
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 10, max: 15 }),
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  };
}
