/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import 'express';
import { IUser } from '~/entities/User';

declare global {
  namespace Express {
    interface User extends IUser {}
  }

}
