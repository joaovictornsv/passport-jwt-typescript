/* eslint-disable no-unused-vars */
import { IUser } from '~/domain/entities/User/IUser';
import { IUserCreateData } from '~/domain/entities/User/IUserCreateData';

export interface IUserRepository {
  create(user: IUserCreateData): Promise<IUser>;

  findById(id: string): Promise<IUser | null>;

  findOne(id: IUser): Promise<IUser | null>;
}
