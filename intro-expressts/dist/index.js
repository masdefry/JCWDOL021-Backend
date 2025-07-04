"use strict";
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
appServer.get('/api/products', (_, res) => {
    // Step-01: Read data from db.json (using fs)
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf-8');
    const dbParse = JSON.parse(db);
    // Step-02: Send data as response
    res.json({
        message: 'Get products successful',
        products: dbParse === null || dbParse === void 0 ? void 0 : dbParse.products,
    });
});
appServer.post('/api/products', (req, res) => {
    var _a, _b;
    const { name, price, stocks, color } = req.body;
    // Step-02: Current data from db.json 
    const db = fs_1.default.readFileSync('./src/db/db.json', 'utf-8');
    const dbParse = JSON.parse(db);
    console.log(dbParse);
    (_a = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products) === null || _a === void 0 ? void 0 : _a.push({ id: ((_b = dbParse === null || dbParse === void 0 ? void 0 : dbParse.products) === null || _b === void 0 ? void 0 : _b.length) + 1, name, color, price, stocks });
    console.log(dbParse);
    // Step-01: Save data from req.body to db.json
    fs_1.default.writeFileSync('./src/db/db.json', JSON.stringify(dbParse));
    // Step-02: Send response
    res.json({
        message: 'Create product successful',
        product: {
            name,
            price,
            stocks,
            color,
        },
    });
});
// Update
// Delete
appServer.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
