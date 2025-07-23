import { Router } from 'express';
import authRouter from './auth.router';
import attendanceRouter from './attendance.router';

const mainRouter = Router();

mainRouter.use('/api/auth', authRouter);
mainRouter.use('/api/attendance', attendanceRouter);

export default mainRouter;
