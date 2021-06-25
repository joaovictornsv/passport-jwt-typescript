import { Router } from 'express';
import { userRouter } from './routers/UserRouter';

const router = Router();

router.use(userRouter);

export { router };
