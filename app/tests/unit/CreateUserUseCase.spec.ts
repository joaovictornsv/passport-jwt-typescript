import sinon from 'sinon';
import { expect } from 'chai';
import { UserRepository } from '../../src/infra/repositories/UserRepository';
import { CreateUserUseCase } from '../../src/application/useCases/User/CreateUserUseCase';
import { IUserCreateData } from '../../src/domain/entities/User/IUserCreateData';
import { generateObjectId } from '../utils/generateObjectId';
import factory from '../utils/factory';

const userRepositoryMock = sinon.createStubInstance(UserRepository);
userRepositoryMock.create.callsFake((u: IUserCreateData):any => ({ ...u, id: generateObjectId() }));
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
    const userData = await factory.attrs<IUserCreateData>('User');
    const user = await createUserUseCase.create(userData);

    expect(user).to.have.property('id');
    expect(user).property('username').to.equal(userData.username);
  });
});
