import { NextFunction, Request, Response } from 'express';
import { createUserService, findUsersService } from '../services/users.service/users.service';

// Controller : Request & Response
// Services   : Logika Backend -> Logika Backend & Komunikasi Database
// Repository (Data Access Layer) : Komunikasi Database

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    await createUserService({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'Create user successful',
      data: { name, email, password },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const findUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findUsersService()
    
    res.status(200).json({
      success: true, 
      message: 'Get users successful', 
      data: users
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
