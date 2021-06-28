import { Response } from 'express';

export const responseMock = {
  status: () => responseMock,
  json: (data: any) => data,
} as unknown as Response;
