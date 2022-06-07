import { Request, Response } from 'express';
import { ISignIn, ISignUp } from '../interfaces/Interfaces';
import { v4 as uuid } from 'uuid';

import db from '../db';

class AuthController {
  static async signIn(req: Request, res: Response): Promise<void> {
    const signIn: ISignIn = req.body;
    try {
      const queryUser = await db.query(
        `SELECT * FROM users WHERE users."email" = $1 AND users."password" = $2`,
        [signIn?.email, signIn?.password],
      );
      const { id } = queryUser.rows[0];
      if (id) {
        const token: string = uuid();
        await db.query(
          `INSERT INTO sessions ("userId","token") VALUES ($1, $2)`,
          [id, token],
        );
        res.status(200).send({ token });
        return;
      }
      res.sendStatus(401);
    } catch (error) {
      res.sendStatus(401);
      return;
    }
  }
  static async signUp(req: Request, res: Response): Promise<void> {
    const signUp: ISignUp = req.body;
    await db.query(`INSERT INTO users ("email", "password") VALUES ($1, $2)`, [
      signUp.email,
      signUp.password,
    ]);
    res.sendStatus(201);
  }
}

export default AuthController;
