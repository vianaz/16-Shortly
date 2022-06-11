"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const allServices_1 = __importDefault(require("../service/allServices"));
exports.default = {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userQuery = (yield allServices_1.default.signInService(req)).rows[0];
                const passwordIsTrue = bcrypt_1.default.compareSync(req.body.password, userQuery.password);
                if (userQuery && passwordIsTrue) {
                    const token = (0, uuid_1.v4)();
                    yield db_1.default.query(`INSERT INTO sessions ("userId","token") VALUES ($1, $2)`, [userQuery.id, token]);
                    res.status(200).send({ token });
                    return;
                }
            }
            catch (error) {
                res.sendStatus(401);
                return;
            }
            res.sendStatus(401);
            return;
        });
    },
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield allServices_1.default.signUpService(req);
                res.sendStatus(201);
            }
            catch (error) {
                res.sendStatus(400);
                return;
            }
        });
    },
};
