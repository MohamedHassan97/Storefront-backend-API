"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderProduct_1 = require("../Models/OrderProduct");
const tokenAuth_1 = __importDefault(require("../helpers/tokenAuth"));
/*
export type OrderProductType = {
    ID?: number;
    quantity: number;
  order_id: number;
  product_id: number;
};
*/
const store = new OrderProduct_1.OrderProductStore();
const addProduct = async (req, res) => {
    const order_id = parseInt(req.params.id);
    const product_id = parseInt(req.body.product_id);
    const quantity = parseInt(req.body.quantity);
    const orderProd = { quantity, order_id, product_id };
    try {
        const newOrderProduct = await store.addOrderProduct(orderProd);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const removeProduct = async (req, res) => {
    const OrderproductId = parseInt(req.params.id);
    try {
        const newOrderProduct = await store.deleteOrderProduct(OrderproductId);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderProductRoutes = (app) => {
    app.post("/orders/:id/products", tokenAuth_1.default, addProduct);
    app.delete("/orders/:id/products", tokenAuth_1.default, removeProduct);
};
exports.default = orderProductRoutes;
