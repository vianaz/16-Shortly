"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const user = 'postgres';
const password = '197320';
const host = 'localhost';
const port = 5432;
const database = 'shortly';
const db = new Pool({
    user,
    password,
    host,
    port,
    database,
});
exports.default = db;
