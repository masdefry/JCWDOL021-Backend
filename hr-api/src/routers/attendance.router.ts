import { Router } from 'express';
import { attendanceClockInController } from '../controllers/attendance.controller';
import { jwtVerify } from '../middlewares/jwt.verify';
const attendanceRouter = Router();

attendanceRouter.post('/clock-in', jwtVerify, attendanceClockInController);

export default attendanceRouter;