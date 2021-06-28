import sinon from 'sinon';
import User from '../../src/entities/User';
import userMock from '../mocks/UserMock';

sinon.stub(User.prototype, 'create').returns(userMock);

describe('User Controller', () => {
  it('should able create a user', async () => {

  });
});
