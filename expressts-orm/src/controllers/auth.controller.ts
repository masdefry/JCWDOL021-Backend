import { Request, Response } from 'express';
import { authLoginService, authRegisterService } from '../services/auth.service/auth.service';

export const authRegisterController = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  await authRegisterService({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: 'Register user successful',
    data: {
      name,
      email,
      role,
    },
  });
};

export const authLoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await authLoginService({email, password})

    res.status(200).json({
        success: true, 
        message: `Login user successful`, 
        data: {
            token
        }
    })
}

// /register/user -> /auth/register/user -> role: USER

// /register/admin -> /auth/register/admin -> role: ADMIN
