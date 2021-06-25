import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../entities/User';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userData = req.body;
    console.log(userData);

    if (!userData.name || !userData.username || !userData.password) {
      return res.status(400).send('Fill required fields');
    }

    const passwordHash = await bcrypt.hash(userData.password, 8);

    userData.password = passwordHash;

    if (!userData.pets) {
      userData.pets = [];
    }

    const user = await User.create(userData);

    return res.status(201).json(user);
  }
}

export { UserController };
