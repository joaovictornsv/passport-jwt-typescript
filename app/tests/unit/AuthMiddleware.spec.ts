import bcrypt from 'bcrypt';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { requestMock } from '../mocks/requestMock';
import { responseMock } from '../mocks/responseMock';
import User from '../../src/entities/User';
import { userReturnedMock } from '../mocks/userMock';
import { verifyJWT, generateJWT } from '../../src/middlewares/AuthMiddleware';

describe('Auth Middleware verifyJWT', () => {
  it('should be generate a JWT', async () => {
    const userMock = sinon.mock(User);
    const bcryptMock = sinon.mock(bcrypt);
    const statusSpy = sinon.spy(responseMock, 'status');

    bcryptMock.expects('compare').returns(true);

    userMock.expects('findOne').returns(userReturnedMock);
    requestMock.body = {
      username: 'username-mock',
    };

    requestMock.headers = {};
    const response = await generateJWT(requestMock, responseMock);
    expect(response).to.have.property('token');
    assert.equal(statusSpy.calledWith(201), true);
  });
});
