import { Request, Response, NextFunction } from 'express';
import allServices from '../service/allServices';

export default {
  async tokenVerify(req: Request, res: Response, next: NextFunction) {
    const tokenQuery = await allServices.TokenService(req);
    if (!tokenQuery.rows[0]) {
      res.sendStatus(401);
      return;
    }
    req.headers.userId = tokenQuery.rows[0].userId;
    next();
  },
};
