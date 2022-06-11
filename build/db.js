import pg from 'pg';
const { Pool } = pg;
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
export default db;
