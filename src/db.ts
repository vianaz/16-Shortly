import pg from "pg";
import { IConfigDB } from "./interfaces/Interfaces";

const { Pool } = pg;

const databaseConfig: IConfigDB = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.MODE === "PROD") {
  databaseConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const connection = new Pool(databaseConfig);

export default connection;
