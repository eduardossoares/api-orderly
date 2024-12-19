import { Request, Response } from "express";
import { EditCategoryService } from "../../services/category/EditCategoryService";

export class EditCategoryController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const { id } = req.params;

        const editCategoryService = new EditCategoryService();
        const editedName = await editCategoryService.execute({id, name});

        res.json(editedName);
        return;
    }
}