import { Response } from 'express';
import sinon from 'sinon';

export const ResponseMock = {} as Response;
sinon.stub(ResponseMock, 'status').returns(ResponseMock);
sinon.stub(ResponseMock, 'json').callsFake((data) => data);
