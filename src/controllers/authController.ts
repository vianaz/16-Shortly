import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import db from "../db";
import allServices from "../service/allServices";

export default {
  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const userQuery = (await allServices.signInService(req)).rows[0];
      const passwordIsTrue = bcrypt.compareSync(
        req.body.password,
        userQuery.password,
      );
      if (userQuery && passwordIsTrue) {
        const token: string = uuid();
        await db.query(
          `INSERT INTO sessions ("userId","token") VALUES ($1, $2)`,
          [userQuery.id, token],
        );
        res.status(200).send({ token });
        return;
      }
    } catch (error) {
      res.sendStatus(401);
      return;
    }
    res.sendStatus(401);
    return;
  },
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      await allServices.signUpService(req);
      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(400);
      return;
    }
  },
};
