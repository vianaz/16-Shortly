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
const allServices_1 = __importDefault(require("../service/allServices"));
exports.default = {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUserId = req.headers.userId;
            const userId = req.params.id;
            if (tokenUserId == userId) {
                try {
                    const userQuery = yield allServices_1.default.getUserService(req);
                    if (userQuery) {
                        res.status(200).send(userQuery);
                        return;
                    }
                    res.sendStatus(404);
                    return;
                }
                catch (error) {
                    res.status(422).send(error);
                    return;
                }
            }
            res.sendStatus(401);
            return;
        });
    },
    getUserRanking(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usersRanking = yield allServices_1.default.getRankingService();
                res.status(200).send(usersRanking);
                return;
            }
            catch (error) {
                res.status(400).send(error);
                return;
            }
        });
    },
};
