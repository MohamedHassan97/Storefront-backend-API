"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductStore {
    async addOrderProduct(orderProd) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO Order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [
                orderProd.quantity,
                orderProd.order_id,
                orderProd.product_id,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add product ${orderProd.product_id} to order ${orderProd.order_id}. Error: ${err}`);
        }
    }
    async deleteOrderProduct(order_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM Order_product WHERE order_id = ($1)";
            await conn.query(sql, [order_id]);
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not delete order details for order id: ${order_id}. Error: ${err}`);
        }
    }
}
exports.OrderProductStore = OrderProductStore;
