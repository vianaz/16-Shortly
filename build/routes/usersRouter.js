"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const tokenMiddleware_1 = __importDefault(require("../middlewares/tokenMiddleware"));
const userRouter = (0, express_1.Router)();
userRouter.get("/users/:id", tokenMiddleware_1.default.tokenVerify, userController_1.default.getUser);
userRouter.get("/ranking", userController_1.default.getUserRanking);
exports.default = userRouter;
