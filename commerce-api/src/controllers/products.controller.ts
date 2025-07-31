import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma.client';
import redis from '../config/redis.config';

export const getProductsController = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  
  const cacheKey = 'products:all';
  await redis.set(cacheKey, JSON.stringify(products));

  res.status(200).json({
    success: true,
    message: 'Get products successfull',
    data: products,
  });
};
