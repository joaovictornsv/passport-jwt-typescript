import sinon from 'sinon';
import { expect, assert } from 'chai';
import { afterEach } from 'mocha';
import User from '../../src/domain/entities/User/User';
import { CreateUserUseCase } from '../../src/application/use-cases/User/CreateUserUseCase';
import { userReturnedMock } from '../mocks/userMock';
import { responseMock } from '../mocks/responseMock';
import { requestMock } from '../mocks/requestMock';
import { IIndexUserRequest, UserController } from '../../src/application/controllers/UserController';

const createUserUseCaseMock = sinon.createStubInstance(CreateUserUseCase);
createUserUseCaseMock.create.resolves(userReturnedMock);

const userController = new UserController(createUserUseCaseMock);

describe('User Controller create', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should able create a user', async () => {
    const UserMock = sandbox.mock(User);
    const statusSpy = sandbox.spy(responseMock, 'status');

    UserMock.expects('findOne').returns(null);

    requestMock.body = {
      name: 'Mock name',
      username: 'Mock username',
      password: 'Mock password',
    };

    const response = await userController.create(requestMock, responseMock);

    expect(response).to.be.have.property('token');
    assert.equal(statusSpy.calledWith(201), true);

    UserMock.verify();
  });

  it('should not able create a user if other with same username already exists', async () => {
    const UserMock = sandbox.mock(User);
    const statusSpy = sandbox.spy(responseMock, 'status');

    UserMock.expects('findOne').returns(userReturnedMock);

    requestMock.body = {
      name: 'Mock name',
      username: 'Mock username',
      password: 'Mock password',
    };

    const response = await userController.create(requestMock, responseMock);
    expect(response).to.be.have.property('error');
    expect(response).to.eql({ error: 'User already exists' });
    assert.equal(statusSpy.calledWith(400), true);

    UserMock.verify();
  });

  it('should not able create a user if required fields are missing', async () => {
    const statusSpy = sandbox.spy(responseMock, 'status');

    requestMock.body = {
      name: 'Mock name',
    };

    const response = await userController.create(requestMock, responseMock);
    expect(response).to.be.have.property('error');
    expect(response).to.eql({ error: 'Fill required fields' });
    assert.equal(statusSpy.calledWith(400), true);
  });
});

describe('User Controller index', () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should index an user', async () => {
    const sendSpy = sandbox.spy(responseMock, 'send');

    const userIndexRequestMock = {
      user: {
        name: 'Mock name',
      },
    } as IIndexUserRequest;

    const response = await userController.index(userIndexRequestMock, responseMock);

    expect(response).to.deep.equal(`Welcome ${userIndexRequestMock.user.name}`);
    assert.equal(sendSpy.calledWith(`Welcome ${userIndexRequestMock.user.name}`), true);
  });
});
