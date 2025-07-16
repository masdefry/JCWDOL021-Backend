"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const films_controller_1 = require("../controllers/films.controller");
const filmsRouter = (0, express_1.default)();
filmsRouter.get('/', films_controller_1.findFilmsController);
exports.default = filmsRouter;
