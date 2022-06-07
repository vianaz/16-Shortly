import { Router } from 'express';
import AuthController from '../controllers/authController.js';
const authRouter = Router();
authRouter.post('/signin', AuthController.signIn);
authRouter.post('/signup', AuthController.signUp);
export default authRouter;
