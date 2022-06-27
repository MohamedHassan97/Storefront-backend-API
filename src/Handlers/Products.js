"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_1 = __importDefault(require("../helpers/tokenAuth"));
const Product_1 = require("../Models/Product");
const store = new Product_1.ProductStore();
// CRUD functions
// Get all products
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// Get product by id
const show = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await store.showWithId(productId);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// Create product
const create = async (req, res) => {
    try {
        const product = {
            product_name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// Delete product by ID
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedOrder = await store.deleteProduct(id);
        return res.end(`deleted product: ${deletedOrder}`);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// each route use one model
const productsRoutes = (app) => {
    app.get("/products", index);
    app.get("/products/:id", show);
    app.post("/products", tokenAuth_1.default, create);
    app.delete("/products/:id", destroy);
};
exports.default = productsRoutes;
