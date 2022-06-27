"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Products_1 = __importDefault(require("./Handlers/Products"));
const User_1 = __importDefault(require("./Handlers/User"));
const Orders_1 = __importDefault(require("./Handlers/Orders"));
const OrderProduct_1 = __importDefault(require("./Handlers/OrderProduct"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
(0, Products_1.default)(app);
(0, User_1.default)(app);
(0, Orders_1.default)(app);
(0, OrderProduct_1.default)(app);
const { PORT } = process.env;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
module.exports = app;
