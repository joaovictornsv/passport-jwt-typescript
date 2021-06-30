import sinon from 'sinon';
import { expect } from 'chai';
import { UserRepository } from '../../src/infra/repositories/UserRepository';
import { CreateUserUseCase } from '../../src/application/useCases/User/CreateUserUseCase';
import { userReturnedMock } from '../mocks/userMock';

const userRepositoryMock = sinon.createStubInstance(UserRepository);
userRepositoryMock.create.resolves(userReturnedMock);
const createUserUseCase = new CreateUserUseCase(userRepositoryMock);

describe('CreateUserUseCase', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  it('should be create user succesfully', async () => {
    const user = await createUserUseCase.create({
      name: userReturnedMock.name,
      username: userReturnedMock.username,
      password: userReturnedMock.password,
    });

    expect(user).to.have.property('id');
    expect(user).to.deep.equal(userReturnedMock);
  });
});
