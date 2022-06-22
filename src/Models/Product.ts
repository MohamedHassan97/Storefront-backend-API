import { PoolClient, QueryResult } from "pg";
import client from "../database";

export type ProductType = {
    ID?: number , 
    product_name  :string,
     price :number , 
     category  :string ;

};

export class ProductStore {
  async index(): Promise<ProductType[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = "SELECT * FROM products";
      const result: QueryResult = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get products,${err}`);
    }
  }

  async showWithId(id: number): Promise<ProductType> {
    try {
      const sql: string = "SELECT * FROM products WHERE id=($1)";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find product ${id}, ${err}`);
    }
  }

  async create(prod: ProductType): Promise<ProductType> {
    try {
      const { product_name  ,price,  category  } = prod;

      const sql: string =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";

      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [
        product_name,
        price,
        category,
      ]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Couldn't add new product ${prod.product_name}, ${err}`);
    }
  }

  async deleteProduct(id: number): Promise<ProductType> {
    try {
      const sql: string = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete product ${id}, ${err}`);
    }
  }
}