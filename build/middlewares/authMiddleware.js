import joi from 'joi';
export default {
    signUpVerify(req, res, next) {
        const signUp = req.body;
        if ((signUp === null || signUp === void 0 ? void 0 : signUp.password) != (signUp === null || signUp === void 0 ? void 0 : signUp.confirmPassword)) {
            res.status(422).send('"password" and "confirm password" is different');
        }
        const signUpSquema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
            confirmPassword: joi.string().required(),
        });
        const { error } = signUpSquema.validate(req.body);
        console.log(error);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
    signInVerify(req, res, next) {
        const signInSquema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required(),
        });
        const { error } = signInSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
