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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const appServer = (0, express_1.default)();
// Body Parser  : Method agar API Express kita dapat mengambil req.body
appServer.use(express_1.default.json());
const port = 5000;
appServer.get('/api', (_, res) => {
    res.json({
        status: 200,
        message: 'Welcome to Express.ts API',
    });
});
// req.url, req.body, req.headers
// req.url : params
//         : query ?start-date=2024-01-01&end-date=2024-02-02&category=TRANSPORT
appServer.get('/api/expenses/:expenseId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Step-01: Get expenseId from params
    const { expenseId } = req.params;
    // Step-02: Find data expenses with expenseId
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf8');
    const dbParse = yield JSON.parse(db);
    const findExpenseByExpenseId = (_a = dbParse === null || dbParse === void 0 ? void 0 : dbParse.expenses) === null || _a === void 0 ? void 0 : _a.filter((expense) => expense.id === parseInt(expenseId));
    if (findExpenseByExpenseId.length === 0)
        res.status(404).json({
            message: `Get detail expense with id = ${expenseId} not found`,
        });
    res.status(200).json({
        message: `Get detail expense with id = ${expenseId} successfull`,
        expense: findExpenseByExpenseId,
    });
}));
appServer.get('/api/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const query = req.query;
    const startDate = query['start-date'];
    const endDate = query['end-date'];
    const category = query['category'];
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf8');
    const dbParse = yield JSON.parse(db);
    const findExpensesByCategoryOrDateRange = (_a = dbParse === null || dbParse === void 0 ? void 0 : dbParse.expenses) === null || _a === void 0 ? void 0 : _a.filter((expense) => {
        return (expense.category === category ||
            (expense.date >= startDate && expense.date <= endDate));
    });
    res.status(200).json({
        message: `Get expense by date range or category success`,
        expenses: findExpensesByCategoryOrDateRange
    });
}));
appServer.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
