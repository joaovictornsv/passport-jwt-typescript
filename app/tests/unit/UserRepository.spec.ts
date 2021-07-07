import sinon from 'sinon';
import { expect } from 'chai';
import { UserRepository } from '../../src/infra/repositories/UserRepository';
import { userReturnedMock } from '../mocks/userMock';
import User from '../../src/domain/entities/User/User';
import factory from '../utils/factory';
import { IUserCreateData } from '../../src/domain/entities/User/IUserCreateData';
import { generateObjectId } from '../utils/generateObjectId';

describe('UserRepository', () => {
  let sandbox: sinon.SinonSandbox;
  const userRepository = new UserRepository();
  let userMock: sinon.SinonMock;

  before(() => {
    userMock = sinon.mock(User);
    userMock.expects('create').callsFake((u: IUserCreateData) => ({ ...u, id: generateObjectId() }));
    userMock.expects('findById').returns(userReturnedMock);
    userMock.expects('findOne').returns(userReturnedMock);
  });

  after(() => {
    userMock.restore();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should create user', async () => {
    const userData = await factory.attrs<IUserCreateData>('User');
    const user = await userRepository.create(userData);

    expect(user).to.have.property('id');
    expect(user).property('username').to.equal(userData.username);
  });

  it('should get user by Id', async () => {
    const user = await userRepository.findById(userReturnedMock.id);

    expect(user).to.have.property('id');
    expect(user).property('id').to.equal(userReturnedMock.id);
  });

  it('should get user by any field', async () => {
    const user = await userRepository.findOne({
      name: userReturnedMock.name,
    });

    expect(user).to.have.property('id');
  });
});
