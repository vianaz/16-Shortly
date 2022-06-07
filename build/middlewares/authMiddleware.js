"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    signUpVerify(req, res, next) {
        const signUp = req.body;
        if (signUp?.password != signUp?.confirmPassword) {
            res.status(422).send('"password" and "confirm password" is different');
        }
        const signUpSquema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
            confirmPassword: joi_1.default.string().required(),
        });
        const { error } = signUpSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
    signInVerify(req, res, next) {
        const signInSquema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        });
        const { error } = signInSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
