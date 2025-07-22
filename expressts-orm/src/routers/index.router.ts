import { Router } from 'express';
import usersRouter from './users.router';
import authRouter from './auth.router';

const mainRouter = Router();

mainRouter.use('/api/users', usersRouter);
mainRouter.use('/api/auth', authRouter);

export default mainRouter;
