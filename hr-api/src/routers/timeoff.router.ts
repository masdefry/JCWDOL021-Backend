import Router from 'express';
import { createTimeOffController } from '../controllers/timeoff.controller';
import { uploaderMulter } from '../middlewares/uploader.multer';
import { jwtVerify } from '../middlewares/jwt.verify';
const timeOffRouter = Router();

timeOffRouter.post(
  '/request',
  jwtVerify,
  uploaderMulter(['image'], 'memoryStorage').fields([
    { name: 'evidence', maxCount: 3 },
  ]),
  createTimeOffController
);

export default timeOffRouter;
