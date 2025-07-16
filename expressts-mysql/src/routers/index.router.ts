import { Router } from 'express';
const mainRouter = Router();
import productsRouter from './products.router';

mainRouter.use('/api/products', productsRouter);

export default mainRouter;