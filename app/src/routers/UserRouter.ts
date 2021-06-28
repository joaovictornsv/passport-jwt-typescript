import { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers/UserController';
import { generateJWT } from '../middlewares/AuthMiddleware';

const router = Router();

const userController = new UserController();

// Home
router.get('/',
  passport.authenticate('jwt', { session: false }),
  userController.index);

// Register

router.post('/login', generateJWT);

router.post('/register', userController.create);

export { router as userRouter };
