import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import productsRoutes from "./Handlers/Products";
import usersRoutes from "./Handlers/users";
import ordersRoutes from "./Handlers/orders";
import orderProductRoutes from "./Handlers/order_product";





const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())



productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);
orderProductRoutes(app);



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})


module.exports = app;
