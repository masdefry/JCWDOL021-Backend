import { Router } from 'express';
import {
  createProductController,
  findProductsController,
} from '../controllers/products.controller';
const productsRouter = Router();

productsRouter.get('/', findProductsController);
productsRouter.post('/', createProductController);

export default productsRouter;
