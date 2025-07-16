import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const errorHandlerValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    next()
  } catch (error) {
    console.log(error);
  }
};
