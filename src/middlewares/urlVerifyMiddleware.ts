import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default {
  urlVerify(req: Request, res: Response, next: NextFunction) {
    const urlSquema = Joi.object({
      url: Joi.string()
        .regex(/https:\/\//)
        .required(),
    });
    const { error } = urlSquema.validate(req.body);

    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },
};
