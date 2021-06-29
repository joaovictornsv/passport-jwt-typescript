/* eslint-disable no-unused-vars */
import { IUser } from '~/domain/entities/User/IUser';
import { IUserCreateData } from '~/domain/entities/User/IUserCreateData';

export interface ICreateUserUseCase {
  create(data: IUserCreateData): Promise<IUser>;
}
