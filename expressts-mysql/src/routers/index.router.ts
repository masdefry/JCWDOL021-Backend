import { Router } from 'express';
const mainRouter = Router();
import productsRouter from './products.router';
import filmsRouter from './films.router';
import customerRouter from './customer.router';

mainRouter.use('/api/products', productsRouter);
mainRouter.use('/api/films', filmsRouter);
mainRouter.use('/api/customers', customerRouter);

export default mainRouter;
