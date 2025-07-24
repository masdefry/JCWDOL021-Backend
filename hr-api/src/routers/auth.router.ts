import Router from 'express';
import {
  authLoginController,
  authRegisterController,
  resetPasswordController,
} from '../controllers/auth.controller';
import { jwtVerify } from '../middlewares/jwt.verify';
import { roleVerify } from '../middlewares/role.verify';
const authRouter = Router();

authRouter.post(
  '/register',
  jwtVerify,
  roleVerify(['HR', 'MANAGER']),
  authRegisterController
);
authRouter.post('/login', authLoginController);
authRouter.patch('/reset-password', jwtVerify, resetPasswordController);

export default authRouter;
