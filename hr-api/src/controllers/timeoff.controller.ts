import { Request, Response } from 'express';

export const createTimeOffController = async (req: Request, res: Response) => {
  console.log('Controller');
  console.log(req.files);
  console.log(req.body);
};
