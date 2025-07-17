"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const register_customer_validator_1 = require("../middlewares/validator/register.customer.validator");
const error_handler_1 = require("../middlewares/validator/error.handler");
const customerRouter = (0, express_1.default)();
customerRouter.get('/:customerId/rentals', customer_controller_1.findDetailCustomerById);
customerRouter.post('/', register_customer_validator_1.registerCustomerValidator, error_handler_1.errorHandlerValidator, customer_controller_1.registerCustomerController);
exports.default = customerRouter;
