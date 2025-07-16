import { body } from 'express-validator';

export const registerCustomerValidator = [
    body(['first_name', 'last_name', 'email', 'store_id', 'address']).notEmpty().escape().withMessage('Request data incomplete'),
    body(['email']).isEmail().withMessage('Invalid email format')
]