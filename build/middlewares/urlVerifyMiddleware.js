import { urlSquema } from '../models/allModel';
export default {
    urlVerify(req, res, next) {
        const { error } = urlSquema.validate(req.body);
        if (error) {
            res.status(422).send(error.details);
            return;
        }
        next();
    },
};
