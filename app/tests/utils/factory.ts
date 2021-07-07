import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../../src/domain/entities/User/User';

factory.define('User', User, {
  name: faker.name.findName(),
  username: faker.internet.userName(),
  password: faker.internet.password(8),
});

export default factory;
