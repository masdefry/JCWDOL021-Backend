import { Router } from 'express';
const mainRouter = Router();
import productsRouter from './products.router';
import filmsRouter from './films.router';

mainRouter.use('/api/products', productsRouter);
mainRouter.use('/api/films', filmsRouter);

export default mainRouter;
