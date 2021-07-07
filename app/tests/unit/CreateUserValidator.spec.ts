import sinon from 'sinon';
import { expect, assert } from 'chai';
import { CreateUserValidator } from '../../src/application/validators/CreateUserValidator';
import { requestMock } from '../mocks/requestMock';
import { responseMock } from '../mocks/responseMock';
import * as next from '../mocks/nextFunctionMock';
import factory from '../utils/factory';
import { IUser } from '../../src/domain/entities/User/IUser';

describe('CreateUserValidator', () => {
  let sandbox: sinon.SinonSandbox;
  let nextFunctionSpy: sinon.SinonSpy;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    nextFunctionSpy = sandbox.spy(next, 'nextFunctionMock');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be validate a user and call next function', async () => {
    const user = await factory.attrs<IUser>('User');
    requestMock.body = user;

    CreateUserValidator(requestMock, responseMock, next.nextFunctionMock);

    assert.equal(nextFunctionSpy.calledOnce, true);
  });

  it('should be throw a error: fields required', () => {
    const statusSpy = sandbox.spy(responseMock, 'status');
    requestMock.body = {};

    const response = CreateUserValidator(requestMock, responseMock, next.nextFunctionMock);

    assert.equal(nextFunctionSpy.calledOnce, false);
    assert.equal(statusSpy.calledOnceWith(400), true);
    expect(response).property('details').to.eql(['"name" is a required field']);
  });
});
