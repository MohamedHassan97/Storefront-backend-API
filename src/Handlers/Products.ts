import express, { Request, Response } from "express";
import verifyAuthToken from "../helpers/tokenAuth";
import { ProductStore, ProductType } from "../Models/Product";




const store = new ProductStore();
// CRUD functions

// Get all products
const index = async (req: Request, res: Response) => {
  try {
    const products: ProductType[] = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};


// Get product by id
const show = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const product: ProductType = await store.showWithId(productId);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};



// Create product
const create = async (req: Request, res: Response) => {
  try {
    const product: ProductType = {
      product_name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct: ProductType = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};




// Delete product by ID
const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedOrder = await store.deleteProduct(id);
    return res.end(`deleted product: ${deletedOrder}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


// each route use one model
const productsRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", destroy);
};

export default productsRoutes; 