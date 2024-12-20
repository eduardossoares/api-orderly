import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
    async handle(req: Request, res: Response) {
        const { name, price, description, category_id } = req.body;

        if(!req.file) throw new Error("invalid banner!");

        const { filename: banner } = req.file;

        const createProductService = new CreateProductService();
        const product = await createProductService.execute({
                name, 
                price,
                description, 
                banner, 
                category_id 
            });

        res.json(product);
        return;
    }
}