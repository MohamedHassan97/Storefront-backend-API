"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var Products_1 = __importDefault(require("./Handlers/Products"));
var User_1 = __importDefault(require("./Handlers/User"));
var Orders_1 = __importDefault(require("./Handlers/Orders"));
var OrderProduct_1 = __importDefault(require("./Handlers/OrderProduct"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
(0, Products_1["default"])(app);
(0, User_1["default"])(app);
(0, Orders_1["default"])(app);
(0, OrderProduct_1["default"])(app);
var PORT = process.env.PORT;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(PORT, function () {
    console.log("starting app on: ".concat(address));
});
module.exports = app;
