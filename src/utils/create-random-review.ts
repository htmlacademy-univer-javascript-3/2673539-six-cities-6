import faker from 'faker';
import { ReviewType } from '../types/review.ts';
import { User } from '../types/user.ts';

export function createRandomReview(): ReviewType {
  const user: User = {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  };

  return {
    id: faker.datatype.uuid(),
    comment: faker.lorem.sentence(),
    date: faker.date.recent().toISOString(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    user,
  };
}
