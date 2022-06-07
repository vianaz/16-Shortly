import { Router } from 'express';

import AuthController from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const authRouter = Router();
authRouter.post('/signin', authMiddleware.signInVerify, AuthController.signIn);
authRouter.post('/signup', authMiddleware.signUpVerify, AuthController.signUp);

export default authRouter;
