"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const databaseConfig = {
    connectionString: process.env.DATABASE_URL,
};
if (process.env.MODE === "PROD") {
    databaseConfig.ssl = {
        rejectUnauthorized: false,
    };
}
const connection = new Pool(databaseConfig);
exports.default = connection;
