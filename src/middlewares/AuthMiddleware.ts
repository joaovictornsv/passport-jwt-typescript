import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '~/entities/User';

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'jvns', async (err: any, decoded: any) => {
      if (err) { return res.status(400).json(err); }

      req.body.id = decoded.id;

      const user = await User.findById(req.body.id);

      if (!user) {
        return res.status(400).json({ error: 'User not exists' });
      }

      next();
    });
  } else {
    return res.status(400).json({ error: 'No headers provided' });
  }
}

async function generateJWT(req: Request, res: Response) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (token) {
      return res.status(400).json({ error: 'A token already exists' });
    }

    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'User not exists' });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(400).json({ error: 'Failed to login, invalid password' });
    }

    const { id } = user;

    const newToken = jwt.sign({ id }, 'jvns', { expiresIn: '1d' });

    return res.status(201).json({ token: newToken });
  }
}

export { verifyJWT, generateJWT };
