import Router from 'express';
import { findDetailCustomerById } from '../controllers/customer.controller';
const customerRouter = Router();

customerRouter.get('/:customerId/rentals', findDetailCustomerById);

export default customerRouter;