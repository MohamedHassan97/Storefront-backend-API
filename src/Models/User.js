"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt = require("bcrypt");
class User {
    // get all users
    async index() {
        try {
            const sql = "SELECT * FROM Users";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't find users, ${err}`);
        }
    }
    // Create
    async create(u) {
        try {
            const sql = "INSERT INTO users (ID ,firstName,lastName,password) VALUES ($1,$2,$3,$4) RETUNING *";
            const conn = await database_1.default.connect();
            // PASSWORD HASHING
            const hash = bcrypt.hashSync(u.password + process.env.pepper, Number(process.env.saltRounds));
            const result = await conn.query(sql, [u.ID, u.firstName, u.lastName, u.password]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't create  users, ${err}`);
        }
    }
    // showwithid
    async showWithId(ID) {
        try {
            const sql = "SELECT * FROM Users WHERE ID=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [ID]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't get the user with that id , ${err}`);
        }
    }
    // delete 
    async deleteUser(ID) {
        try {
            const sql = `DELETE FROM users WHERE ID=$1`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [ID]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Couldn't delete user ${ID}, ${err}`);
        }
    }
}
exports.User = User;
