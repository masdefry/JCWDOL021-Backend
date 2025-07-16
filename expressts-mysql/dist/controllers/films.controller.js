"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFilmsController = void 0;
const connection_1 = __importDefault(require("../connection"));
const findFilmsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    let sqlQuery = `select title, description, release_year, name as category_name from film f
join film_category fc on fc.film_id = f.film_id
join category c on c.category_id = fc.category_id`;
    if (category)
        sqlQuery += ` where name = ?`;
    const films = yield connection_1.default.promise().query(sqlQuery, [category]);
    res.status(200).json({
        success: true,
        message: category ? `Successfully retrieved films in category: ${category}` : 'Successfully retrieved films',
        data: films[0]
    });
});
exports.findFilmsController = findFilmsController;
