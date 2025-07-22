import { NextFunction, Request, Response } from 'express';
import {
  createUserService,
  deleteUserService,
  findUsersService,
  updateUserService,
} from '../services/users.service/users.service';

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
    const users = await findUsersService();

    res.status(200).json({
      success: true,
      message: 'Get users successful',
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const { id } = req.params;

    // await updateUserService({ email, name, password, id });

    res.status(200).json({
      success: true,
      message: `Update user with id = ${id} successfull`,
      data: { email, name },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserService({ id });

  res.status(200).json({
    success: true,
    message: `Delete user with id = ${id} successful`,
  });
};
