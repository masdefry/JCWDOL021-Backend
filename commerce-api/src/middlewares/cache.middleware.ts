import { NextFunction, Request, Response } from 'express';
import redis from '../config/redis.config';

export const cacheMiddleware = (cacheKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cachedData = await redis.get(cacheKey);

    if (!cachedData) return next();

    const cachedDataJSON = await JSON.parse(cachedData);

    res.status(200).json({
      success: true,
      message: 'Get products from cache successfull',
      data: cachedDataJSON,
    });
  };
};
