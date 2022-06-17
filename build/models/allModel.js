"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSquema = exports.signInSquema = exports.signUpSquema = void 0;
const joi_1 = __importDefault(require("joi"));
// Auth Models
exports.signUpSquema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required(),
});
exports.signInSquema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
// Url Models
exports.urlSquema = joi_1.default.object({
    url: joi_1.default.string()
        .regex(/https:\/\//)
        .required(),
});
