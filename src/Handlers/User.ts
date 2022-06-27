import express, { Request, Response } from "express";
import verifyAuthToken from "../helpers/tokenAuth";
import { User, UserType } from "../Models/User";
import jwt from "jsonwebtoken";

const UserStore = new User();

// ---------CRUD functions--------- //

// Get all users
const index = async (req: Request, res: Response) => {
  try {
    const users: UserType[] = await UserStore.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get user by id
const show = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const new_user: UserType[] = await UserStore.showWithId(userId);
    res.json(new_user);
  } catch (err) {
    res.status(400).json(err);
  }
};


// Create user
const create = async (req: Request, res: Response) => {
  try {
    // get user data from the request
    const user: UserType = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
      password: req.body.password,
    };

    // create user
    const newUser = await UserStore.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete user by ID
const destroy = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    await UserStore.deleteUser(id);
    return res.end(`deleted user`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// each route use one model
const usersRoutes = (app: express.Application) => {
  // using the middleware function to Validate the user's token to Authorize him to the next action
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", destroy);
};

export default usersRoutes; // to be used in the server file to have clean code