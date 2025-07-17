import { Router } from 'express';
import usersRouter from './users.router';

const mainRouter = Router();

mainRouter.use('/api/users', usersRouter);

export default mainRouter;
