import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import db from '../db.js';
import { ISignUp, ISignIn } from '../interfaces/signUpInterface.js';

export default {
  signUpVerify(req: Request, res: Response, next: NextFunction) {
    const signUp: ISignUp = req.body;
    if (signUp?.password != signUp?.confirmPassword) {
      res.status(422).send('"password" and "confirm password" is different');
    }
    const signUpSquema = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      confirmPassword: joi.string().required(),
    });
    const { error } = signUpSquema.validate(req.body);
    console.log(error);

    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },
  signInVerify(req: Request, res: Response, next: NextFunction) {
    const signInSquema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
    const { error } = signInSquema.validate(req.body);
    if (error) {
      res.status(422).send(error.details);
      return;
    }
    next();
  },
};
