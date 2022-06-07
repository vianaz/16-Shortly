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
      console.log(req.headers.userId, url.url, short, shortUrl);

      await db.query(
        `INSERT INTO urls ("userId","url", "short", "shortUrl") VALUES ($1, $2, $3, $4)`,
        [req.headers.userId, url.url, short, shortUrl],
      );
      res.status(201).send({ shortUrl });
    } catch (error) {
      res.status(422).send(error);
    }
  },
  getShorten(req: Request, res: Response) {
    res.status(200).send('get shorten');
  },
  getRedirect(req: Request, res: Response) {
    res.status(200).send('get redirect');
  },
  deleteShorten(req: Request, res: Response) {
    res.status(200).send('delete shorten');
  },
};
