import { IUserRepository } from '~/application/repositories/IUserRepository';
import { IUser } from '~/domain/entities/User/IUser';
import { IUserCreateData } from '~/domain/entities/User/IUserCreateData';
import { IUserFindOneData } from '~/domain/entities/User/IUserFindOneData';
import User from '~/domain/entities/User/User';

class UserRepository implements IUserRepository {
  async create(data: IUserCreateData): Promise<IUser> {
    const user = await User.create(data);
    return user;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user;
  }

  async findOne(data: IUserFindOneData): Promise<IUser | null> {
    const user = await User.findOne(data);
    return user;
  }
}

export { UserRepository };
