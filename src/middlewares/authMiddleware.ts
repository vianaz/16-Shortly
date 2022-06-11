import { NextFunction, Request, Response } from 'express';
import { signInSquema, signUpSquema } from '../models/allModel';

export default {
  signUpVerify(req: Request, res: Response, next: NextFunction) {
    const { error } = signUpSquema.validate(req.body);
    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },

  signInVerify(req: Request, res: Response, next: NextFunction) {
    const { error } = signInSquema.validate(req.body);
    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },
};
