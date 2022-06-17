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
const nanoid_1 = require("nanoid");
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    //Middlewares Services
    TokenService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let authorization = req.headers.authorization;
            authorization = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
            return yield db_1.default.query(`SELECT * FROM sessions WHERE sessions."token" = $1`, [authorization]);
        });
    },
    // Auth Services
    signInService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const signIn = req.body;
            return yield db_1.default.query(`SELECT * FROM users WHERE users."email" = $1`, [signIn.email]);
        });
    },
    signUpService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const signUp = req.body;
            const passwordCrypt = bcrypt_1.default.hashSync(signUp.password, 10);
            yield db_1.default.query(`INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`, [signUp.name, signUp.email, passwordCrypt]);
        });
    },
    // Urls Services
    postShortenService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = req.body;
            const short = (0, nanoid_1.nanoid)();
            yield db_1.default.query(`INSERT INTO urls ("userId","url", "short") VALUES ($1, $2, $3)`, [req.headers.userId, url.url, short]);
            return short;
        });
    },
    getShortenService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return (yield db_1.default.query(`SELECT urls."id", urls."short" AS "shortUrl", urls."url" FROM urls WHERE urls."id" = $1`, [id])).rows[0];
        });
    },
    getRedirectService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shortUrl } = req.params;
            const shortUrlQuery = (yield db_1.default.query(`SELECT * FROM urls WHERE urls."short" = $1`, [shortUrl])).rows[0];
            const sumViews = shortUrlQuery.views + 1;
            return { sumViews, shortUrlQuery };
        });
    },
    deleteShortenService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return (yield db_1.default.query(`SELECT * FROM urls WHERE urls."id" = $1`, [id]))
                .rows[0];
        });
    },
    // User Services
    getUserService(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userInfos = yield db_1.default.query(`SELECT users."id", users."name", SUM(urls."views") as "visitCount" FROM users 
    LEFT JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1
    GROUP BY users."id"`, [id]);
            const shortUrlsUser = yield db_1.default.query(`SELECT urls."id", urls."short" AS "shortUrl", urls."url", urls."views" AS "visitCount" FROM users
    JOIN urls
    ON urls."userId" = users."id"
    WHERE users."id" = $1`, [id]);
            console.log(userInfos.rows);
            return Object.assign(Object.assign({}, userInfos.rows[0]), { shortenedUrls: shortUrlsUser.rows });
        });
    },
    getRankingService() {
        return __awaiter(this, void 0, void 0, function* () {
            const ranking = yield db_1.default.query(`SELECT users."id", users."email", COUNT(urls."short") AS "linkCount", SUM(urls."views") AS "visitCount" 
    FROM users
    JOIN urls
    ON users."id" = urls."userId"
    GROUP BY users."id"
    ORDER BY "visitCount" DESC
    LIMIT 10`);
            return ranking.rows;
        });
    },
};
