import { Request, Response } from "express";
import allServices from "../service/allServices";

export default {
  async getUser(req: Request, res: Response) {
    const tokenUserId = req.headers.userId;
    const userId = req.params.id;
    if (tokenUserId == userId) {
      try {
        const userQuery = await allServices.getUserService(req);
        if (userQuery) {
          res.status(200).send(userQuery);
          return;
        }
        res.sendStatus(404);
        return;
      } catch (error) {
        res.status(422).send(error);
        return;
      }
    }
    res.sendStatus(401);
    return;
  },
  async getUserRanking(req: Request, res: Response) {
    try {
      const usersRanking = await allServices.getRankingService();
      res.status(200).send(usersRanking);
      return;
    } catch (error) {
      res.status(400).send(error);
      return;
    }
  },
};
