import Router from 'express';
import { createTimeOffController } from '../controllers/timeoff.controller';
import { uploaderMulter } from '../middlewares/uploader.multer';
const timeOffRouter = Router();

timeOffRouter.post(
  '/request',
  uploaderMulter(['image'], 'memoryStorage').fields([
    { name: 'evidence', maxCount: 3 },
  ]),
  createTimeOffController
);

export default timeOffRouter;
