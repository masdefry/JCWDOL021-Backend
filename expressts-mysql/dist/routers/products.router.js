"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/', products_controller_1.findProductsController);
productsRouter.post('/', products_controller_1.createProductController);
exports.default = productsRouter;
