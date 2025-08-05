import { Router } from 'express';
import { getProductsController } from '../controllers/products.controller';
import { cacheMiddleware } from '../middlewares/cache.middleware';
const productsRouter = Router();

productsRouter.get('/', cacheMiddleware('products:all'), getProductsController);

export default productsRouter;
