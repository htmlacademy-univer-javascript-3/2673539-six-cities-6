import { OfferType } from '../types/offer.ts';
import faker from 'faker';
import { createRandomOffer } from './create-random-offer.ts';

export function createRandomDetailedOffer(): OfferType {
  return {
    ...createRandomOffer(),
    description: faker.lorem.paragraph(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: faker.random.arrayElements(['Wi-Fi', 'Air conditioning', 'Washer', 'Breakfast'], 3),
    host: {
      name: faker.name.findName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    images: [
      'https://images.com/1',
      'https://images.com/2',
      'https://images.com/3'
    ],
    maxAdults: faker.datatype.number({ min: 1, max: 6 }),
  };
}
