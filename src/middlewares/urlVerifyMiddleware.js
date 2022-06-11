"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allModel_1 = require("../models/allModel");
exports.default = {
    urlVerify(req, res, next) {
        const { error } = allModel_1.urlSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
