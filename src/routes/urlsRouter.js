"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const urlsControllers_1 = __importDefault(require("../controllers/urlsControllers"));
const tokenMiddleware_1 = __importDefault(require("../middlewares/tokenMiddleware"));
const urlVerifyMiddleware_1 = __importDefault(require("../middlewares/urlVerifyMiddleware"));
const urlRouter = (0, express_1.Router)();
urlRouter.post('/urls/shorten', tokenMiddleware_1.default.tokenVerify, urlVerifyMiddleware_1.default.urlVerify, urlsControllers_1.default.postShorten);
urlRouter.get('/urls/:id', urlsControllers_1.default.getShorten);
urlRouter.get('/urls/open/:shortUrl', urlsControllers_1.default.getRedirect);
urlRouter.delete('/urls/:id', tokenMiddleware_1.default.tokenVerify, urlsControllers_1.default.deleteShorten);
exports.default = urlRouter;
