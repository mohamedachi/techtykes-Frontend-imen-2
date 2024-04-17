import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'New Instance 1',
  'Instance 2',
  'Instance 3',
  'Instance 4',
  'Instance 5',
  'Instance 6',
  'Instance 7',
  'Instance 8',
  'Instance 9',
  'Instance 10',
  'Instance 11',
  'Instance 12',
  'Instance 13',
  'Instance 14',
  'Instance 15',
  'Instance 16',
  'Instance 17',
  'Instance 18',
  'Instance 19',
  'Instance 20',
  'Instance 21',
  'Instance 22',
  'Instance 23',
];

export const posts = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index],
  createdAt: faker.date.past(),
  plan: faker.number.int(99999) < 50000 ? 'Basic' : 'Premium',
  favorite: faker.number.int(99999),
  author: {
    name: faker.person.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));
