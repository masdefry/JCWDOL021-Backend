import db from '../connection';
import { Request, Response } from 'express';

export const findProductsController = async (req: Request, res: Response) => {
  const findProducts = await db.promise().query('SELECT * FROM products');

  res.status(200).json({
    message: 'Get products success',
    products: findProducts[0],
  });
};

export const createProductController = async (req: Request, res: Response) => {
    
}