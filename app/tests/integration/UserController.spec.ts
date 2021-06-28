import sinon from 'sinon';
import { expect, assert } from 'chai';
import { afterEach } from 'mocha';
import User from '../../src/entities/User';
import { userReturnedMock } from '../mocks/userMock';
import { responseMock } from '../mocks/responseMock';
import { requestMock } from '../mocks/requestMock';
import { UserController } from '../../src/controllers/UserController';

const userController = new UserController();

describe('User Controller', () => {
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
    UserMock.expects('create').returns(userReturnedMock);

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
});
