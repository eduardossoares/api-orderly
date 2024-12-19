import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";

export class DetailUserController {
    async handle(req: Request, res: Response) {
        const { user_id } = req;
        const detailUserService = new DetailUserService()
        const detailUser = await detailUserService.execute(user_id);
        res.json(detailUser);
    }
}