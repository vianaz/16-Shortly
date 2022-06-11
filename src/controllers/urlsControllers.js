"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const allServices_1 = __importDefault(require("../service/allServices"));
exports.default = {
    postShorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shortUrl = yield allServices_1.default.postShortenService(req);
                res.status(201).send({ shortUrl });
            }
            catch (error) {
                res.status(422).send(error);
            }
        });
    },
    getShorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shortUrl = yield allServices_1.default.getShortenService(req);
                if (!shortUrl) {
                    res.sendStatus(404);
                    return;
                }
                res.status(200).send(shortUrl);
                return;
            }
            catch (error) {
                res.status(400).send(error);
                return;
            }
        });
    },
    getRedirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sumViews, shortUrlQuery } = yield allServices_1.default.getRedirectService(req);
                if (shortUrlQuery) {
                    yield db_1.default.query(`UPDATE urls SET "views" = $1 WHERE "short" = $2`, [
                        sumViews,
                        shortUrlQuery.short,
                    ]);
                    res.redirect(shortUrlQuery.url);
                    return;
                }
                res.sendStatus(404);
                return;
            }
            catch (error) {
                res.status(400).send(error);
                return;
            }
        });
    },
    deleteShorten(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUserId = req.headers.userId;
            try {
                const deleteQuery = yield allServices_1.default.deleteShortenService(req);
                if (deleteQuery) {
                    if (deleteQuery.userId === tokenUserId) {
                        db_1.default.query(`DELETE FROM urls WHERE "id" = $1`, [deleteQuery.id]);
                        res.sendStatus(204);
                        return;
                    }
                    res.sendStatus(401);
                    return;
                }
                res.sendStatus(404);
                return;
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    },
};
