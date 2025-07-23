// HOC (High Order Component)
// Function yg me-return function lain

import { NextFunction, Request, Response } from 'express';

export const roleVerify = (authorizeRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.payload;
    
    if(!authorizeRole.includes(role)) throw { isExpose: true, message: 'Unauthorize user role' }

    next()
  };
};
