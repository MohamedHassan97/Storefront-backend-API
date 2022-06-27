const app = require("../../server");
const supertest = require("supertest");
import { OrderType } from "../../Models/Order";
import { UserType } from "../../Models/User";
/*
type OrderType={
    ID?:number,
    UserID:number,
    Order_status:string
  
  
  };
  
type UserType={
    ID? :number,
    firstName:string,
    lastName:string,
    password:string


};



*/



const request = supertest(app);

describe("Orders Endpoints", () => {
  // to use them globally
  let token: string = "";

  const orderExample: OrderType = {
    UserID: 1,
    Order_status: "completed",
  };
  const userExample: UserType = {
    firstName: "Ahmed",
    lastName: "Ali",
    password: "553366",
  };

  // creating user to get JWT for Authorization
  beforeAll(async () => {
    const newUser = await request.post("/users").send(userExample);

    token = newUser.body;
  });
  afterAll(async () => {
    await request.delete("/users/1");
  });

  it("Should Create order ", async () => {
    const newOrder = await request
      .post("/orders")
      .send(orderExample)
      .set("Authorization", `Bearer ${token}`);

    expect(newOrder.status).toBe(200);
    expect(newOrder.body).toEqual({
        ID: 1,
      ...orderExample,
    });
  });

  it("Should Get all orders ", async () => {
    const orders = await request
      .get("/orders")
      .set(`Authorization`, "Bearer " + token);

    expect(orders.status).toBe(200);
    expect(orders.body.length).toBeGreaterThan(0);
  });

  it("Should Get orders by user id ", async () => {
    const orders = await request
      .get("/orders/1")
      .set(`Authorization`, "Bearer " + token);
    expect(orders.status).toBe(200);
    expect(orders.body).toEqual([
      {
        ID: 1,
        ...orderExample,
      },
    ]);
  });

  it("Should Get empty list of Current orders using current", async () => {
    const orders = await request
      .get("/orders/current")
      .set(`Authorization`, "Bearer " + token);
    expect(orders.status).toBe(200);
    expect(orders.body).toEqual([]);
  });

  it("Should Get all Completed orders ", async () => {
    const orders = await request
      .get("/orders/completed")
      .set(`Authorization`, "Bearer " + token);
    expect(orders.status).toBe(200);
    expect(orders.body).toEqual([
      {
        ID: 1,
        ...orderExample,
      },
    ]);
  });
});