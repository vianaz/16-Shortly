import { IUrls } from './../interfaces/Interfaces';
import { Request, Response } from 'express';
import db from '../db';
import { nanoid } from 'nanoid';

export default {
  async postShorten(req: Request, res: Response) {
    const url: IUrls = req.body;
    try {
      const short = nanoid();

      await db.query(
        `INSERT INTO urls ("userId","url", "short") VALUES ($1, $2, $3) RETURNING id`,
        [req.headers.userId, url.url, short],
      );

      res.status(201).send({ short });
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

  async getRedirect(req: Request, res: Response) {
    const { shortUrl } = req.params;
    try {
      const shortUrlQuery = await db.query(
        `SELECT * FROM urls WHERE urls."short" = $1`,
        [shortUrl],
      );

      const sumViews: number = shortUrlQuery.rows[0].views + 1;

      if (!shortUrlQuery.rows[0]) {
        res.sendStatus(404);
        return;
      }
      await db.query(`UPDATE urls SET "views" = $1 WHERE "short" = $2`, [
        sumViews,
        shortUrl,
      ]);

      res.redirect(`${shortUrlQuery.rows[0].url}`);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  },

  async deleteShorten(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteQuery = await db.query(`SELECT * FROM urls WHERE id = $1`, [
        id,
      ]);

      if (!deleteQuery.rows[0]) {
        res.sendStatus(404);
        return;
      }

      await db.query(`DELETE FROM urls WHERE "id" = $1`, [id]);

      res.sendStatus(204);
      return;
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
