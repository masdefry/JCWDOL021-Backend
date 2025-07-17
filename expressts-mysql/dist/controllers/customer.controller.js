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
exports.registerCustomerController = exports.findDetailCustomerById = void 0;
const connection_1 = __importDefault(require("../connection"));
const findDetailCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { customerId } = req.params;
    const detailCustomer = yield connection_1.default.promise().query(`select concat(c.first_name, ' ', c.last_name) as customer_name, c.email, title, rental_date, return_date, concat(s.first_name, ' ', s.last_name) as staff_name from customer c
join rental r on c.customer_id = r.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
join staff s on r.staff_id = s.staff_id
where c.customer_id = ?`, [customerId]);
    const rentals = (_a = detailCustomer[0]) === null || _a === void 0 ? void 0 : _a.map((rental) => {
        return {
            title: rental === null || rental === void 0 ? void 0 : rental.title,
            rental_date: rental === null || rental === void 0 ? void 0 : rental.rental_date,
            return_date: rental === null || rental === void 0 ? void 0 : rental.return_date,
            staff_name: rental === null || rental === void 0 ? void 0 : rental.staff_name,
        };
    });
    res.status(200).json({
        success: true,
        message: 'Retrieved rental history for customer',
        data: {
            customer_name: (_b = detailCustomer[0][0]) === null || _b === void 0 ? void 0 : _b.customer_name,
            email: (_c = detailCustomer[0][0]) === null || _c === void 0 ? void 0 : _c.email,
            rentals,
        },
    });
});
exports.findDetailCustomerById = findDetailCustomerById;
const registerCustomerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { first_name, last_name, email, store_id, address } = req.body;
    const [findCity] = yield connection_1.default
        .promise()
        .query(`SELECT * FROM city WHERE city_id = ?`, [
        address === null || address === void 0 ? void 0 : address.city_id,
    ]);
    if (findCity.length === 0)
        return res.status(404).json({
            success: false,
            message: `City with id ${address === null || address === void 0 ? void 0 : address.city_id} not found`,
        });
    const [findStore] = yield connection_1.default
        .promise()
        .query(`SELECT * FROM store WHERE store_id = ?`, [
        store_id,
    ]);
    if (findStore.length === 0) {
        return res.status(404).json({
            success: false,
            message: `Store with id ${store_id} not found`,
        });
    }
    const createdAddress = yield connection_1.default
        .promise()
        .query(`INSERT INTO address(address, address2, district, city_id, postal_code, phone, location) VALUES (?, ?, ?, ?, ?, ?, ST_GeomFromText('POINT (-112.8185647 49.6999986)'))`, [
        address === null || address === void 0 ? void 0 : address.address,
        address === null || address === void 0 ? void 0 : address.address2,
        address === null || address === void 0 ? void 0 : address.district,
        address === null || address === void 0 ? void 0 : address.city_id,
        address === null || address === void 0 ? void 0 : address.postal_code,
        address === null || address === void 0 ? void 0 : address.phone,
    ]);
    const createdCustomer = yield connection_1.default
        .promise()
        .query(`INSERT INTO customer(store_id, first_name, last_name, email, address_id) VALUES(?, ?, ?, ?, ?)`, [store_id, first_name, last_name, email, (_a = createdAddress[0]) === null || _a === void 0 ? void 0 : _a.insertId]);
    res.status(201).json({
        success: true,
        message: `Create new customer data successful`,
        data: { first_name, last_name, email, store_id, address },
    });
});
exports.registerCustomerController = registerCustomerController;
