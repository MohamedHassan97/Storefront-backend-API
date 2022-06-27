"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
class Order {
    // get all orders
    async index() {
        try {
            const sql = "SELECT * FROM orders";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders, ${err}`);
        }
    }
    // get orders with some id 
    async showWithId(ID) {
        try {
            const sql = "SELECT * FROM orders WHERE ID=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [ID]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders, ${err}`);
        }
    }
    // Create
    async create(userId, status) {
        try {
            const sql = "INSERT INTO orders (UserID, Order_status) VALUES ($1,$2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId, status]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't create orders, ${err}`);
        }
    }
    async showCompleted() {
        try {
            const sql = "SELECT FROM orders WHERE Order_status LIKE '%comp*'";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders, ${err}`);
        }
    }
    async showCurrent() {
        try {
            const sql = "SELECT FROM orders WHERE Order_status LIKE '%curr*'";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find orders, ${err}`);
        }
    }
}
exports.Order = Order;
