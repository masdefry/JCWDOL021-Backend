"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerCustomerValidator = [
    (0, express_validator_1.body)(['first_name', 'last_name', 'email', 'store_id', 'address']).notEmpty().escape().withMessage('Request data incomplete'),
    (0, express_validator_1.body)(['email']).isEmail().withMessage('Invalid email format')
];
