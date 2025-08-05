import { Router } from 'express';
import productsRouter from './products.router';
import transactionsRouter from './transactions.router';
const mainRouter = Router();

mainRouter.use('/api/products', productsRouter);
mainRouter.use('/api/transactions', transactionsRouter);

export default mainRouter;
