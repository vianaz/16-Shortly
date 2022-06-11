import { Request, Response, NextFunction } from 'express';
import { urlSquema } from '../models/allModel';

export default {
  urlVerify(req: Request, res: Response, next: NextFunction) {
    const { error } = urlSquema.validate(req.body);
    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },
};
