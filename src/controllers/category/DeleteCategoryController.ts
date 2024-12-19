import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";

export class DeleteCategoryController {
    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const deleteCategoryService = new DeleteCategoryService();
        const category = await deleteCategoryService.execute(id);

        res.json(category);
    }
}