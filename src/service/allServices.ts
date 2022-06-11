import { Request } from "express";
import { nanoid } from "nanoid";
import db from "../db";
import { ISignIn, ISignUp, IUrls } from "../interfaces/Interfaces";

export default {
  //Middlewares Services
  async TokenService(req: Request) {
    let authorization: string | undefined = req.headers.authorization;
    authorization = authorization?.replace("Bearer ", "");
    return await db.query(
      `SELECT * FROM sessions WHERE sessions."token" = $1`,
      [authorization],
    );
  },

  // Auth Services
  async signInService(req: Request) {
    const signIn: ISignIn = req.body;
    return await db.query(
      `SELECT * FROM users WHERE users."email" = $1 AND users."password" = $2`,
      [signIn.email, signIn.password],
    );
  },
  async signUpService(req: Request) {
    const signUp: ISignUp = req.body;
    await db.query(`INSERT INTO users ("email", "password") VALUES ($1, $2)`, [
      signUp.email,
      signUp.password,
    ]);
  },

  // Urls Services
  async postShortenService(req: Request) {
    const url: IUrls = req.body;
    const short = nanoid();
    await db.query(
      `INSERT INTO urls ("userId","url", "short") VALUES ($1, $2, $3)`,
      [req.headers.userId, url.url, short],
    );
    return short;
  },
  async getShortenService(req: Request) {
    const { id } = req.params;
    return (
      await db.query(
        `SELECT urls."id", urls."short" AS "shortUrl", urls."url" FROM urls WHERE urls."id" = $1`,
        [id],
      )
    ).rows[0];
  },
  async getRedirectService(req: Request) {
    const { shortUrl } = req.params;
    const shortUrlQuery = (
      await db.query(`SELECT * FROM urls WHERE urls."short" = $1`, [shortUrl])
    ).rows[0];
    const sumViews: number = shortUrlQuery.views + 1;
    return { sumViews, shortUrlQuery };
  },
  async deleteShortenService(req: Request) {
    const { id } = req.params;
    return (await db.query(`SELECT * FROM urls WHERE urls."id" = $1`, [id]))
      .rows[0];
  },

  // User Services
  async getUserService(req: Request) {
    const { id } = req.params;
    const userInfos = await db.query(
      `SELECT users."id", users."email", SUM(urls."views") as "visitCount" FROM users 
    JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1
    GROUP BY users."id"`,
      [id],
    );
    const shortUrlsUser = await db.query(
      `SELECT urls."id", urls."short" AS "shortUrl", urls."url", urls."views" AS "visitCount" FROM users
    JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1`,
      [id],
    );
    return { ...userInfos.rows[0], shortenedUrls: shortUrlsUser.rows };
  },
};
