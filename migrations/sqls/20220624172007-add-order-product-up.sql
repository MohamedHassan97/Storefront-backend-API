CREATE TABLE Order_product( ID SERIAL PRIMARY KEY , quantity INTEGER, order_id INTEGER REFERENCES Orders(ID) , product_id INTEGER REFERENCES Products(ID));