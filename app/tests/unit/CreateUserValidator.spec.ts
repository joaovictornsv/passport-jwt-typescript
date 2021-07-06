import sinon from 'sinon';
import { expect, assert } from 'chai';
import { CreateUserValidator } from '../../src/application/validators/CreateUserValidator';
import { requestMock } from '../mocks/requestMock';
import { responseMock } from '../mocks/responseMock';
import * as next from '../mocks/nextFunctionMock';

const responseJoiError = {
  status: 'Validation error',
  details: [],
};

describe('CreateUserValidator', () => {
  let sandbox: sinon.SinonSandbox;
  let nextFunctionSpy: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    requestMock.body = {};
    responseJoiError.details = [];
    nextFunctionSpy = sandbox.spy(next, 'nextFunctionMock');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be validate a user and call next function', () => {
    requestMock.body = {
      name: 'Mock user',
      username: 'mock_username',
      password: 'mockPassword',
    };

    CreateUserValidator(requestMock, responseMock, next.nextFunctionMock);

    assert.equal(nextFunctionSpy.calledOnce, true);
  });

  it('should be throw a error: fields required', () => {
    const statusSpy = sandbox.spy(responseMock, 'status');

    responseJoiError.details = [
      '"name" is a required field',
    ];

    const response = CreateUserValidator(requestMock, responseMock, next.nextFunctionMock);

    assert.equal(nextFunctionSpy.calledOnce, false);
    assert.equal(statusSpy.calledOnceWith(400), true);
    expect(response).to.eql(responseJoiError);
  });
});
