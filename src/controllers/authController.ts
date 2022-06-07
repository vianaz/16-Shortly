import { Request, Response } from 'express';
import { ISignIn } from '../interfaces/signUpInterface.js';
import db from '../db.js';

class AuthController {
  static async signIn(req: Request, res: Response): Promise<void> {
    const signIn: ISignIn = req.body;
    const queryUser = await db.query(
      `SELECT * FROM users WHERE users."email" = $1 AND users."password" = $2`,
      [signIn?.email, signIn?.password],
    );
    if (queryUser.rows[0]) {
      res.status(200).send('login successful');
      return;
    }
    res.sendStatus(401);
  }
  static signUp(req: Request, res: Response): void {
    console.log('sign-up');
  }
}

export default AuthController;
