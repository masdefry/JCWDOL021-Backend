import { body } from 'express-validator';

export const registerCustomerValidator = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email format'),
  body('store_id')
    .notEmpty()
    .isInt()
    .withMessage('Store ID must be an integer'),

  body('address.address').notEmpty().withMessage('Address is required'),
  body('address.address2').notEmpty().withMessage('Address2 is required'),
  body('address.city_id')
    .notEmpty()
    .isInt()
    .withMessage('City ID must be an integer'),
  body('address.district').notEmpty().withMessage('District is required'),
  body('address.postal_code').notEmpty().withMessage('Postal code is required'),
  body('address.phone').notEmpty().withMessage('Phone is required'),
];
