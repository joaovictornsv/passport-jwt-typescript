import { Router } from 'express';
import passport from 'passport';
import { UserController } from '~/application/controllers/UserController';
import { generateJWT } from '~/application/middlewares/AuthMiddleware';
import { CreateUserUseCase } from '~/application/use-cases/User/CreateUserUseCase';
import { UserRepository } from '../repositories/UserRepository';

const router = Router();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

console.log(userController);

// Home
router.get('/',
  passport.authenticate('jwt', { session: false }),
  userController.index);

// Register

router.post('/login', generateJWT);

router.post('/register', userController.create);

export { router as userRouter };
