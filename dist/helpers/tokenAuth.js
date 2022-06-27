"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
// middleware
var verifyAuthToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("authorization header is not available"); // Guard clause
        }
        var token = authHeader.split(" ")[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next(); // !IMPORTANT
    }
    catch (error) {
        res.status(401).json(error);
    }
};
exports["default"] = verifyAuthToken;
