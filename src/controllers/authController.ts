import { Request, Response } from 'express';

class AuthController {
  static signIn(req: Request, res: Response): void {
    
    res.send('sign-in');
  }
  static signUp(req: Request, res: Response): void {
    console.log('sign-up');
  }
}

export default AuthController;
