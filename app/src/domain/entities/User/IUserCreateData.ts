import { IUser } from './IUser';

export type IUserCreateData = Omit<IUser, 'id'>
