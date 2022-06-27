import express, { Request, Response } from "express";
import verifyAuthToken from "../helpers/tokenAuth";
import { Order, OrderType } from "../Models/Order";

const orderStore = new Order();

/* ---------CRUD functions--------- 


export type OrderType={
    ID?:number,
    UserID:number,
    Order_status:string
  
  
  };
  
  

*/

// create order
const create = async (req: Request, res: Response) => {
  try {
    // get user data from the request
    const order: OrderType = {
        UserID: req.body.user_id,
      Order_status: req.body.status,
    };

    const newOrder: OrderType[] = await orderStore.create(order.UserID,order.Order_status);
    return res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Get all completed orders
const CompletedOrders = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.showCompleted();
    console.log(Orders);
    return res.json(Orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Get all Current orders
const CurrentOrders = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.showCurrent();
    return res.json(Orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// Get orders by user id
const show = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const Orders: OrderType[] = await orderStore.showWithId(userId);
    return res.json(Orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
// Get all orders
const index = async (req: Request, res: Response) => {
  try {
    const Orders: OrderType[] = await orderStore.index();
    return res.json(Orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// each route use one model (ORDER IS IMPORTANT)
const ordersRoutes = (app: express.Application) => {
  // using the middleware function to Validate the order's token to Authorize him to the next action
  app.post("/orders", verifyAuthToken, create);
  app.get("/orders/current", verifyAuthToken, CurrentOrders);
  app.get("/orders/completed", verifyAuthToken, CompletedOrders);
  app.get("/orders/:id", verifyAuthToken, show);
  app.get("/orders", verifyAuthToken, index);
};

export default ordersRoutes; 