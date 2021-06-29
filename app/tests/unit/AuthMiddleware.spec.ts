import bcrypt from 'bcrypt';
import sinon from 'sinon';
import { expect, assert } from 'chai';
import { requestMock } from '../mocks/requestMock';
import { responseMock } from '../mocks/responseMock';
import * as next from '../mocks/nextFunctionMock';
import User from '../../src/domain/entities/User/User';
import { userReturnedMock } from '../mocks/userMock';
import { verifyJWT, generateJWT } from '../../src/application/middlewares/AuthMiddleware';

async function generateJWTSuccessfully(sandbox: sinon.SinonSandbox) {
  const userMock = sandbox.mock(User);
  userMock.expects('findOne').returns(userReturnedMock);

  const bcryptMock = sandbox.mock(bcrypt);
  bcryptMock.expects('compare').returns(true);
  requestMock.headers = {};
  const response = await generateJWT(requestMock, responseMock);
  return response.toString();
}

describe('Auth Middleware generateJWT', () => {
  let sandbox: sinon.SinonSandbox;
  let statusSpy: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestMock.headers = {};
    statusSpy = sandbox.spy(responseMock, 'status');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be generate a JWT succesfully', async () => {
    const userMock = sandbox.mock(User);
    userMock.expects('findOne').returns(userReturnedMock);

    const bcryptMock = sandbox.mock(bcrypt);
    bcryptMock.expects('compare').returns(true);

    requestMock.headers = {};
    const response = await generateJWT(requestMock, responseMock);

    const jwtRegexValidator = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    expect(response).to.match(jwtRegexValidator);
    assert.equal(statusSpy.calledWith(200), true);
  });

  it('should not be generate a JWT without headers', async () => {
    requestMock.headers = null;

    const response = await generateJWT(requestMock, responseMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'No headers provided' });
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be generate a JWT if a token already exists', async () => {
    requestMock.headers = {
      authorization: 'Bearer token',
    };

    const response = await generateJWT(requestMock, responseMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'A token already exists' });
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be generate a JWT if a user not exists', async () => {
    const userMock = sandbox.mock(User);
    userMock.expects('findOne').returns(null);

    const response = await generateJWT(requestMock, responseMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'User not exists' });
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be generate a JWT if a password is not valid', async () => {
    const userMock = sandbox.mock(User);
    userMock.expects('findOne').returns(userReturnedMock);

    const bcryptMock = sandbox.mock(bcrypt);
    bcryptMock.expects('compare').returns(false);

    const response = await generateJWT(requestMock, responseMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'Failed to login, invalid password' });
    assert.equal(statusSpy.calledWith(400), true);
  });
});

describe('Auth Middleware verifyJWT', () => {
  let sandbox: sinon.SinonSandbox;
  let statusSpy: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestMock.headers = {};
    statusSpy = sandbox.spy(responseMock, 'status');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be verify JWT and authenticate succesfully', async () => {
    const token = await generateJWTSuccessfully(sandbox);

    requestMock.headers = {
      authorization: token,
    };

    const nextFunctionSpy = sandbox.spy(next, 'nextFunctionMock');

    const userMock = sandbox.mock(User);
    userMock.expects('findById').returns(userReturnedMock);

    await verifyJWT(requestMock, responseMock, next.nextFunctionMock);

    assert.equal(nextFunctionSpy.calledOnce, true);
  });

  it('should not be verify JWT without headers', async () => {
    requestMock.headers = null;

    const response = await verifyJWT(requestMock, responseMock, next.nextFunctionMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'No headers provided' });
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be verify JWT if token not provided', async () => {
    requestMock.headers = {
      authorization: null,
    };

    const response = await verifyJWT(requestMock, responseMock, next.nextFunctionMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'No token provided' });
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be verify JWT if token is invalid', async () => {
    requestMock.headers = {
      authorization: 'Invalid token',
    };

    const response = await verifyJWT(requestMock, responseMock, next.nextFunctionMock);

    expect(response).to.have.property('error');
    assert.equal(statusSpy.calledWith(400), true);
  });

  it('should not be verify JWT if token is user not exists', async () => {
    const token = await generateJWTSuccessfully(sandbox);

    requestMock.headers = {
      authorization: token,
    };

    const userMock = sandbox.mock(User);
    userMock.expects('findById').returns(null);

    const response = await verifyJWT(requestMock, responseMock, next.nextFunctionMock);

    expect(response).to.have.property('error');
    expect(response).to.eql({ error: 'User not exists' });
    assert.equal(statusSpy.calledWith(400), true);
  });
});
