/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { IUserRepository } from '~/application/repositories/IUserRepository';
import { IUser } from '~/domain/entities/User/IUser';
import { IUserCreateData } from '~/domain/entities/User/IUserCreateData';
import { ICreateUserUseCase } from '~/domain/useCases/User/ICreateUserUseCase';

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async create(data: IUserCreateData): Promise<IUser> {
    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateUserUseCase };
