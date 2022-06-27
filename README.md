# Storefront Backend Project

### Env variables that I used 

- PORT= 3000
- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=store_front
- POSTGRES_TEST_DB=store_front_test
- POSTGRES_USER=project_user
- POSTGRES_PASSWORD=password123
- ENV=dev
- BCRYPT_PASSWORD=pass123
- SALT_ROUNDS=10
- TOKEN_SECRET=KbjBCPAMrt
## install dependenscies
```
npm install
```
## Create Database 

- connect to the default postgres database as the server's root user : 

```
psql -U postgres
```
- In psql run the following to create a user
```
CREATE USER project_user WITH PASSWORD 'password123';
```
- In psql run the following to create the dev and test database
```
CREATE DATABASE store_front;
CREATE DATABASE store_front_test;
```
- Connect to the databases and grant all privileges
```
\c store_front;
GRANT ALL PRIVILEGES ON DATABASE store_front TO project_user;

\c store_front_test;
GRANT ALL PRIVILEGES ON DATABASE store_front_test TO project_user;
```
- In psql run the following to create the dev and test database
```
CREATE DATABASE store_front;
CREATE DATABASE store_front_test;
```





- Run Migrations
```
# globally to use its  terminal comands
npm install -g db-migrate
db-migrate up
```

- Run development server
```
npm start

# or
npm run watch
```


- or: Run Production server
```
npm run build & node dist/server.js

```


- you can check the databse structure from that  [link](https://github.com/MohamedHassan97/Storefront-backend-API/blob/master/REQUIREMENTS.md)






# API Endpoints

### Products

- Index: /products (http://localhost:3000/products) [get]
- Show: /products/:id (http://localhost:3000/products/:id) [get]
- Create: /products (http://localhost:3000/products) [post]
- Delete: /products/:id  (http://localhost:3000/products/:id) [delete]

### Users
- Index: /users (http://localhost:3000/users)  [get]
- Show: /users/:id (http://localhost:3000/users:id)    [get]
- Create: /users  (http://localhost:3000/users) [post]
- Delete: /users  (http://localhost:3000/users:id)  [delete]

### Orders
- Index: /orders (http://localhost:3000/orders)   [get]
- Show: /orders/:id  (http://localhost:3000/orders:id)   [get]
- Create: /orders   (http://localhost:3000/orders)  [post]
- CurrentOrders: /orders/current   (http://localhost:3000/orders/current)   [get]
- CompletedOrders: /orders/completed      (http://localhost:3000/orders/completed ) [get]

### OrderProduct

- Show: /orders/:id/products (http://localhost:3000/orders/:id/products) [get]
- delete: /orders/:id/products  (http://localhost:3000/orders/:id/products) [delete]



## Ports
- Server runs on port ``` 3000```
- Database on port ```5432```





# Data Shapes

### Product
- id [SERIAL PRIMARY KEY]
- name [VARCHAR(50)]
- price [NUMERIC]

### User
- id [SERIAL PRIMARY KEY]
- firstName [VARCHAR(50)]
- lastName [VARCHAR(50)]
- password [VARCHAR(60)]

### Orders
- id [SERIAL PRIMARY KEY]
- user_id [INTEGER]
- status [VARCHAR(20)] (active or current or complete)

### Order_Product
- id [SERIAL PRIMARY KEY]
- quantity [INTEGER]
- user_id [INTEGER] REFERENCES orders(id)
- product_id [INTEGER] REFERENCES products(id)





