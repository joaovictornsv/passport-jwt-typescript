import { Response } from 'express';

export const responseMock = {
  status: () => responseMock,
  json: (data: any) => data,
  send: (data: any) => data,
} as unknown as Response;
