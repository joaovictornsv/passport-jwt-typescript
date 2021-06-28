import sinon from 'sinon';
import { expect, assert } from 'chai';
import User from '../../src/entities/User';
import { userMock } from '../mocks/userMock';
import { responseMock } from '../mocks/responseMock';
import { requestMock } from '../mocks/requestMock';
import { UserController } from '../../src/controllers/UserController';

const userController = new UserController();

const UserMock = sinon.mock(User);

describe('User Controller', () => {
  it('should able create a user', async () => {
    UserMock.expects('findOne').returns(null);
    UserMock.expects('create').returns(userMock);

    const statusSpy = sinon.spy(responseMock, 'status');

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
});
