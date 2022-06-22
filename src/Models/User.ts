import {PoolClient ,QueryResult} from "pg";
import client from "../database";
const bcrypt = require("bcrypt");


export type UserType={
    ID? :number,
    firstName:string,
    lastName:string,
    password:string


};


export class User{

  



    // get all users
    async index(): Promise<UserType[]> {
        try
        {
          const sql: string = "SELECT * FROM Users";
          const conn: PoolClient = await client.connect();
          const result: QueryResult = await conn.query(sql);
          conn.release();
          return result.rows;
        } 

        catch (err) 
    {
      throw new Error(`Couldn't find users, ${err}`);
    }
 }




// Create
async create ( u: UserType  ): Promise<UserType[]> {
    try
    {
      const sql: string = "INSERT INTO users (ID ,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETUNING *";
      const conn: PoolClient = await client.connect();
      
        // PASSWORD HASHING
        const hash = bcrypt.hashSync(
            u.password + process.env.pepper,
            Number(process.env.saltRounds)
          );
      
      
      const result: QueryResult = await conn.query(sql,[u.ID,u.firstName,u.lastName,u.password]);
      conn.release();
      return result.rows[0];
    } 
    
    
    catch (err) 
    {
      throw new Error(`Couldn't create  users, ${err}`);
    }
  }





 






  // showwithid

  async showWithId(ID:number): Promise<UserType[]> {
    try
    {
      const sql: string = "SELECT * FROM Users WHERE ID=($1)";
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql,[ID]);
      conn.release();
      return result.rows[0];
    } 

    catch (err) 
{
  throw new Error(`Couldn't get the user with that id , ${err}`);
}
}


// delete 

async deleteUser(ID: number): Promise<UserType> {
    try {
      const sql: string = `DELETE FROM users WHERE ID=$1`;
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [ID]);
      conn.release();

      return result.rows[0];
    } catch (err)
     {

      throw new Error(`Couldn't delete user ${ID}, ${err}`);
    }
  }
  








}


