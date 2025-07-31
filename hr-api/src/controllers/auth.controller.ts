import { Request, Response } from 'express';
import {
  authLoginService,
  authRegisterService,
  authSessionLoginService,
  resetPasswordService,
} from '../services/auth.service/auth.service';

export const authRegisterController = async (req: Request, res: Response) => {
  const { fullName, email, password, role, shiftId } = req.body;

  await authRegisterService({
    fullName,
    email,
    password,
    role,
    shiftId: parseInt(shiftId),
  });

  res.status(201).json({
    success: true,
    message: 'Register user successful',
    data: {
      fullName,
      email,
      role,
    },
  });
};

export const authLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { token, fullName, role } = await authLoginService({ email, password });

  res.status(200).json({
    success: true,
    message: `Login user successful`,
    data: { token, fullName, role },
  });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { userId } = res.locals.payload;

  await resetPasswordService({ id: userId, password });

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  });
};

export const authSessionLoginController = async (
  req: Request,
  res: Response
) => {
  const { userId } = res?.locals?.payload;

  const { role, fullName } = await authSessionLoginService({ userId });

  res.status(200).json({
    success: true,
    message: 'Session login user successfully',
    data: { role, fullName },
  });
};
