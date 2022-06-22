import dotenv from "dotenv";
import {Pool} from"pg";




dotenv.config()// intialize  the  enviroment variable 

const {
POSTGRES_HOST,
POSTGRES_DB,
POSTGRES_USER,
POSTGRES_PASSWORD, 
POSTGRES_TESTDB,
ENV
}=process.env ;

console.log(ENV);


let client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TESTDB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;

