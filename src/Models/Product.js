"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't get products,${err}`);
        }
    }
    async showWithId(id) {
        try {
            const sql = "SELECT * FROM products WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't find product ${id}, ${err}`);
        }
    }
    async create(prod) {
        try {
            const { product_name, price, category } = prod;
            const sql = "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                product_name,
                price,
                category,
            ]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Couldn't add new product ${prod.product_name}, ${err}`);
        }
    }
    async deleteProduct(id) {
        try {
            const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't delete product ${id}, ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
