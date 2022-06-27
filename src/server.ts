import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from "dotenv";

import productsRoutes from "./Handlers/Products";
import usersRoutes from "./Handlers/User";
import ordersRoutes from "./Handlers/Orders";
import orderProductRoutes from "./Handlers/OrderProduct";





const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())



productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);
orderProductRoutes(app);


const { PORT } = process.env;


app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(PORT, function () {
    console.log(`starting app on: ${address}`)
})


module.exports = app;
