import { nanoid } from "nanoid";
import db from "../db";
import bcrypt from "bcrypt";
export default {
    //Middlewares Services
    async TokenService(req) {
        let authorization = req.headers.authorization;
        authorization = authorization?.replace("Bearer ", "");
        return await db.query(`SELECT * FROM sessions WHERE sessions."token" = $1`, [authorization]);
    },
    // Auth Services
    async signInService(req) {
        const signIn = req.body;
        return await db.query(`SELECT * FROM users WHERE users."email" = $1`, [signIn.email]);
    },
    async signUpService(req) {
        const signUp = req.body;
        const passwordCrypt = bcrypt.hashSync(signUp.password, 10);
        await db.query(`INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`, [signUp.name, signUp.email, passwordCrypt]);
    },
    // Urls Services
    async postShortenService(req) {
        const url = req.body;
        const short = nanoid();
        await db.query(`INSERT INTO urls ("userId","url", "short") VALUES ($1, $2, $3)`, [req.headers.userId, url.url, short]);
        return short;
    },
    async getShortenService(req) {
        const { id } = req.params;
        return (await db.query(`SELECT urls."id", urls."short" AS "shortUrl", urls."url" FROM urls WHERE urls."id" = $1`, [id])).rows[0];
    },
    async getRedirectService(req) {
        const { shortUrl } = req.params;
        const shortUrlQuery = (await db.query(`SELECT * FROM urls WHERE urls."short" = $1`, [shortUrl])).rows[0];
        const sumViews = shortUrlQuery.views + 1;
        return { sumViews, shortUrlQuery };
    },
    async deleteShortenService(req) {
        const { id } = req.params;
        return (await db.query(`SELECT * FROM urls WHERE urls."id" = $1`, [id]))
            .rows[0];
    },
    // User Services
    async getUserService(req) {
        const { id } = req.params;
        const userInfos = await db.query(`SELECT users."id", users."name", SUM(urls."views") as "visitCount" FROM users 
    LEFT JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1
    GROUP BY users."id"`, [id]);
        const shortUrlsUser = await db.query(`SELECT urls."id", urls."short" AS "shortUrl", urls."url", urls."views" AS "visitCount" FROM users
    JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1`, [id]);
        console.log(userInfos.rows);
        return { ...userInfos.rows[0], shortenedUrls: shortUrlsUser.rows };
    },
    async getRankingService() {
        const ranking = await db.query(`SELECT users."id", users."email", COUNT(urls."short") AS "linkCount", SUM(urls."views") AS "visitCount" 
    FROM users
    JOIN urls
    ON users."id" = urls."userId"
    GROUP BY users."id"
    ORDER BY "visitCount" DESC
    LIMIT 10`);
        return ranking.rows;
    },
};
