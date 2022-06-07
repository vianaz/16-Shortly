import { Request, Response, NextFunction } from 'express';
import db from '../db';
export default {
  async tokenVerify(req: Request, res: Response, next: NextFunction) {
    let authorization: string | undefined = req.headers.authorization;
    authorization = authorization?.replace('Bearer ', '');
    const tokenQuery = await db.query(
      `SELECT * FROM sessions WHERE sessions."token" = $1`,
      [authorization],
    );

    if (!tokenQuery.rows[0]) {
      res.sendStatus(401);
      return;
    }
    req.headers.userId = tokenQuery.rows[0].id;
    next();
  },
};
