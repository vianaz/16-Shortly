import { Router } from "express";
import userController from "../controllers/userController";
import tokenMiddleware from "../middlewares/tokenMiddleware";
const userRouter = Router();

userRouter.get(
  "/users/:id",
  tokenMiddleware.tokenVerify,
  userController.getUser,
);
userRouter.get("/ranking");

export default userRouter;
