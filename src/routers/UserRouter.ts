import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { generateJWT, verifyJWT } from '../middlewares/AuthMiddleware';

const router = Router();

const userController = new UserController();

// Home
router.get('/', verifyJWT, userController.index);

// Register

router.post('/login', generateJWT);

router.post('/register', userController.create);

export { router as userRouter };
