"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const customerRouter = (0, express_1.default)();
customerRouter.get('/:customerId/rentals', customer_controller_1.findDetailCustomerById);
customerRouter.post('/', 
// registerCustomerValidator,
// errorHandlerValidator,
customer_controller_1.registerCustomerController);
exports.default = customerRouter;
