import { IUrls } from './../interfaces/Interfaces';
import { Request, Response } from 'express';
import db from '../db';
import { nanoid } from 'nanoid';

export default {
  async postShorten(req: Request, res: Response) {
    const url: IUrls = req.body;
    try {
      const short = nanoid();
      const shortUrl = `${url.url}/${short}`;

      await db.query(
        `INSERT INTO urls ("userId","url", "short", "shortUrl") VALUES ($1, $2, $3, $4)`,
        [req.headers.userId, url.url, short, shortUrl],
      );
      res.status(201).send({ shortUrl });
    } catch (error) {
      res.status(422).send(error);
    }
  },
  async getShorten(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shortUrlQuery = await db.query(
        `SELECT urls."id", urls."short" AS "shortUrl", urls."url" FROM urls WHERE urls."id" = $1`,
        [id],
      );
      const shortUrlData: IUrls = shortUrlQuery.rows[0];
      if (!shortUrlData) {
        res.sendStatus(404);
        return;
      }
      res.status(200).send(shortUrlData);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  },
  getRedirect(req: Request, res: Response) {
    res.status(200).send('get redirect');
  },
  deleteShorten(req: Request, res: Response) {
    res.status(200).send('delete shorten');
  },
};
