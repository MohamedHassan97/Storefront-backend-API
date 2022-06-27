"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_1 = __importDefault(require("../helpers/tokenAuth"));
const User_1 = require("../Models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserStore = new User_1.User();
// ---------CRUD functions--------- //
// Get all users
const index = async (req, res) => {
    try {
        const users = await UserStore.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// Get user by id
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const new_user = await UserStore.showWithId(userId);
        res.json(new_user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// Create user
const create = async (req, res) => {
    try {
        // get user data from the request
        const user = {
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            password: req.body.password,
        };
        // create user
        const newUser = await UserStore.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
// Delete user by ID
const destroy = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await UserStore.deleteUser(id);
        return res.end(`deleted user`);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
// each route use one model
const usersRoutes = (app) => {
    // using the middleware function to Validate the user's token to Authorize him to the next action
    app.get("/users", tokenAuth_1.default, index);
    app.get("/users/:id", tokenAuth_1.default, show);
    app.post("/users", create);
    app.delete("/users/:id", destroy);
};
exports.default = usersRoutes; // to be used in the server file to have clean code
