"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
const products_router_1 = __importDefault(require("./products.router"));
const films_router_1 = __importDefault(require("./films.router"));
mainRouter.use('/api/products', products_router_1.default);
mainRouter.use('/api/films', films_router_1.default);
exports.default = mainRouter;
