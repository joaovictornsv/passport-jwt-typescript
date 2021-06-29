import { Router } from 'express';
import { userRouter } from '~/infra/routers/UserRouter';

const router = Router();

router.use(userRouter);

export { router };
