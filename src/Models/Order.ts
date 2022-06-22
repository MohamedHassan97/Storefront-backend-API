import {PoolClient ,QueryResult} from "pg";
import client from "../database";

export type OrderType={
  ID?:number,
  UserID:number,
  Order_status:string


};



export class Order{

  



// get all orders
async index(): Promise<OrderType[]> {
    try
    {
      const sql: string = "SELECT * FROM orders";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } 
    
    
    
    catch (err) 
    {
      throw new Error(`Couldn't find orders, ${err}`);
    }
  }

// get orders with some id 

  async showWithId (ID : number ): Promise<OrderType[]> {
    try
    {
      const sql: string = "SELECT * FROM orders WHERE ID=($1)";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql , [ID]);
      conn.release();
      return result.rows;
    } 
    
    
    catch (err) 
    {
      throw new Error(`Couldn't find orders, ${err}`);
    }
  }


// Create
async create ( userId : number, status :string   ): Promise<OrderType[]> {
  try
  {
    const sql: string = "INSERT INTO orders (UserID, Order_status) VALUES ($1,$2) RETURNING*";
    const conn: PoolClient = await client.connect();
    const result: QueryResult = await conn.query(sql,[userId,status]);
    
    conn.release();
    return result.rows[0];
  } 
  
  
  catch (err) 
  {
    throw new Error(`Couldn't create orders, ${err}`);
  }
}







  async showCompleted (  ): Promise<OrderType[]> {
    try
    {
      const sql: string = "SELECT FROM orders WHERE Order_status LIKE '%comp*'";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql );
      conn.release();
      return result.rows;
    } 
    
    
    catch (err) 
    {
      throw new Error(`Couldn't find orders, ${err}`);
    }
  }


  async showCurrent (  ): Promise<OrderType[]> {
    try
    {
      const sql: string = "SELECT FROM orders WHERE Order_status LIKE '%curr*'";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql );
      conn.release();
      return result.rows;
    } 
    
    
    catch (err) 
    {
      throw new Error(`Couldn't find orders, ${err}`);
    }
  }















}