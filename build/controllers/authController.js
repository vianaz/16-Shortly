"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../db"));
class AuthController {
    static async signIn(req, res) {
        const signIn = req.body;
        try {
            const queryUser = await db_1.default.query(`SELECT * FROM users WHERE users."email" = $1 AND users."password" = $2`, [signIn?.email, signIn?.password]);
            if (queryUser.rows[0]) {
                const token = (0, uuid_1.v4)();
                res.status(200).send({ token });
                return;
            }
        }
        catch (error) {
            res.sendStatus(401);
            return;
        }
    }
    static async signUp(req, res) {
        const signUp = req.body;
        await db_1.default.query(`INSERT INTO users (users."email", users."password") VALUES ($1, $2)`, [signUp.email, signUp.password]);
        res.sendStatus(201);
        console.log('sign-up');
    }
}
exports.default = AuthController;
