import allServices from '../service/allServices';
export default {
    async tokenVerify(req, res, next) {
        const tokenQuery = await allServices.TokenService(req);
        if (!tokenQuery.rows[0]) {
            res.sendStatus(401);
            return;
        }
        req.headers.userId = tokenQuery.rows[0].userId;
        next();
    },
};
