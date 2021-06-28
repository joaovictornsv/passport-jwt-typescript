import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '~/entities/User';
import 'dotenv/config';
import { SECRET_KEY } from '~/constants/env';

export interface IIndexUserRequest extends Request{
  user?: IUser;
}

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userData = req.body;

    if (!userData.name || !userData.username || !userData.password) {
      return res.status(400).json({ error: 'Fill required fields' });
    }

    const passwordHash = await bcrypt.hash(userData.password, 8);

    userData.password = passwordHash;

    const userAlreadyExists = await User.findOne({ username: userData.username });

    if (userAlreadyExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id } = await User.create({
      name: userData.name,
      username: userData.username,
      password: userData.password,
    });

    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '1d' });

    return res.status(201).json({ token });
  }

  async index(req: IIndexUserRequest, res: Response) {
    const { user } = req;

    return res.send(`Welcome ${user.name}`);
  }
}

export { UserController };