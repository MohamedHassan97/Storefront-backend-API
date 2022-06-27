"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_1 = __importDefault(require("../helpers/tokenAuth"));
const Order_1 = require("../Models/Order");
const orderStore = new Order_1.Order();
/* ---------CRUD functions---------


export type OrderType={
    ID?:number,
    UserID:number,
    Order_status:string
  
  
  };
  
  

*/
// create order
const create = async (req, res) => {
    try {
        // get user data from the request
        const order = {
            UserID: req.body.user_id,
            Order_status: req.body.status,
        };
        const newOrder = await orderStore.create(order.UserID, order.Order_status);
        return res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// Get all completed orders
const CompletedOrders = async (req, res) => {
    try {
        const Orders = await orderStore.showCompleted();
        console.log(Orders);
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// Get all Current orders
const CurrentOrders = async (req, res) => {
    try {
        const Orders = await orderStore.showCurrent();
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// Get orders by user id
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const Orders = await orderStore.showWithId(userId);
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// Get all orders
const index = async (req, res) => {
    try {
        const Orders = await orderStore.index();
        return res.json(Orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// each route use one model (ORDER IS IMPORTANT)
const ordersRoutes = (app) => {
    // using the middleware function to Validate the order's token to Authorize him to the next action
    app.post("/orders", tokenAuth_1.default, create);
    app.get("/orders/current", tokenAuth_1.default, CurrentOrders);
    app.get("/orders/completed", tokenAuth_1.default, CompletedOrders);
    app.get("/orders/:id", tokenAuth_1.default, show);
    app.get("/orders", tokenAuth_1.default, index);
};
exports.default = ordersRoutes;
