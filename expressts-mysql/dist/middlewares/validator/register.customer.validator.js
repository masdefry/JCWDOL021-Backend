"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerCustomerValidator = [
    (0, express_validator_1.body)('first_name').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('last_name').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('email').notEmpty().isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('store_id')
        .notEmpty()
        .isInt()
        .withMessage('Store ID must be an integer'),
    (0, express_validator_1.body)('address.address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('address.address2').notEmpty().withMessage('Address2 is required'),
    (0, express_validator_1.body)('address.city_id')
        .notEmpty()
        .isInt()
        .withMessage('City ID must be an integer'),
    (0, express_validator_1.body)('address.district').notEmpty().withMessage('District is required'),
    (0, express_validator_1.body)('address.postal_code').notEmpty().withMessage('Postal code is required'),
    (0, express_validator_1.body)('address.phone').notEmpty().withMessage('Phone is required'),
];
