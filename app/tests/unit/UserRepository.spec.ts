import sinon from 'sinon';
import { expect } from 'chai';
import { UserRepository } from '../../src/infra/repositories/UserRepository';
import { userReturnedMock } from '../mocks/userMock';
import User from '../../src/domain/entities/User/User';

describe('UserRepository', () => {
  let sandbox: sinon.SinonSandbox;
  const userRepository = new UserRepository();
  let userMock: sinon.SinonMock;

  before(() => {
    userMock = sinon.mock(User);
    userMock.expects('create').returns(userReturnedMock);
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
    const user = await userRepository.create({
      name: userReturnedMock.name,
      username: userReturnedMock.username,
      password: userReturnedMock.password,
    });

    expect(user).to.have.property('id');
    expect(user).to.deep.equal(userReturnedMock);
  });

  it('should get user by Id', async () => {
    const user = await userRepository.findById(userReturnedMock.id);

    expect(user).to.have.property('id');
    expect(user).to.deep.equal(userReturnedMock);
  });

  it('should get user by any field', async () => {
    const user = await userRepository.findOne({
      name: userReturnedMock.name,
    });

    expect(user).to.have.property('id');
    expect(user).to.deep.equal(userReturnedMock);
  });
});
