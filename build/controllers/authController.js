var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from '../db.js';
class AuthController {
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const signIn = req.body;
            const queryUser = yield db.query(`SELECT * FROM users WHERE users."email" = $1 AND users."password" = $2`, [signIn === null || signIn === void 0 ? void 0 : signIn.email, signIn === null || signIn === void 0 ? void 0 : signIn.password]);
            if (queryUser.rows[0]) {
                res.status(200).send('login successful');
                return;
            }
            res.sendStatus(401);
        });
    }
    static signUp(req, res) {
        console.log('sign-up');
    }
}
export default AuthController;
