"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signin', authMiddleware_1.default.signInVerify, authController_1.default.signIn);
authRouter.post('/signup', authMiddleware_1.default.signUpVerify, authController_1.default.signUp);
exports.default = authRouter;
