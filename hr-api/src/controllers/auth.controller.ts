import { Request, Response } from 'express';
import {
  authLoginService,
  authRegisterService,
} from '../services/auth.service/auth.service';

export const authRegisterController = async (req: Request, res: Response) => {
  const { fullName, email, password, role, shiftId } = req.body;

  await authRegisterService({ fullName, email, password, role, shiftId });

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

  const token = await authLoginService({ email, password });

  res.status(200).json({
    success: true,
    message: `Login user successful`,
    data: {
      token,
    },
  });
};
