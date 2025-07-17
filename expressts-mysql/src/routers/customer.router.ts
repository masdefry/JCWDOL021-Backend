import Router from 'express';
import {
  findDetailCustomerById,
  registerCustomerController,
} from '../controllers/customer.controller';
import { registerCustomerValidator } from '../middlewares/validator/register.customer.validator';
import { errorHandlerValidator } from '../middlewares/validator/error.handler';
const customerRouter = Router();

customerRouter.get('/:customerId/rentals', findDetailCustomerById);
customerRouter.post(
  '/',
  registerCustomerValidator,
  errorHandlerValidator,
  registerCustomerController
);

export default customerRouter;
