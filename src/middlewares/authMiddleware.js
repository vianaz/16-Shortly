"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allModel_1 = require("../models/allModel");
exports.default = {
    signUpVerify(req, res, next) {
        const { error } = allModel_1.signUpSquema.validate(req.body);
        if (error || req.body.password !== req.body.confirmPassword) {
            res.status(422).send(error === null || error === void 0 ? void 0 : error.details);
            return;
        }
        next();
    },
    signInVerify(req, res, next) {
        const { error } = allModel_1.signInSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
