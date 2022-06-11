import { signInSquema, signUpSquema } from "../models/allModel";
export default {
    signUpVerify(req, res, next) {
        const { error } = signUpSquema.validate(req.body);
        if (error || req.body.password !== req.body.confirmPassword) {
            res.status(422).send(error?.details);
            return;
        }
        next();
    },
    signInVerify(req, res, next) {
        const { error } = signInSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
