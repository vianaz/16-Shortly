import { Request, Response } from 'express';
import db from '../db';
import allServices from '../service/allServices';

export default {
  async postShorten(req: Request, res: Response) {
    try {
      const shortUrl = await allServices.postShortenService(req);
      res.status(201).send({ shortUrl });
    } catch (error) {
      res.status(422).send(error);
    }
  },

  async getShorten(req: Request, res: Response) {
    try {
      const shortUrl = await allServices.getShortenService(req);
      if (!shortUrl) {
        res.sendStatus(404);
        return;
      }
      res.status(200).send(shortUrl);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  },

  async getRedirect(req: Request, res: Response) {
    try {
      const { sumViews, shortUrlQuery } = await allServices.getRedirectService(
        req,
      );
      if (shortUrlQuery) {
        await db.query(`UPDATE urls SET "views" = $1 WHERE "short" = $2`, [
          sumViews,
          shortUrlQuery.short,
        ]);
        res.redirect(`${shortUrlQuery.rows[0].url}`);
        return;
      }
      res.sendStatus(404);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  },

  async deleteShorten(req: Request, res: Response) {
    try {
      const deleteQuery = await allServices.deleteShortenService(req);
      if (deleteQuery) {
        db.query(`DELETE FROM urls WHERE "id" = $1`, [deleteQuery.id]);
        res.sendStatus(204);
        return;
      }
      res.sendStatus(404);
      return;
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
