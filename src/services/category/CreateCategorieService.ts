import { prismaClient } from "../../prisma";

export class CreateCategoryService {
    async execute(name: string) {
        if(!name) throw new Error("invalid name");

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        });

        if(categoryAlreadyExists) throw new Error("category name already exists!");

        const category = await prismaClient.category.create({
            data: {
                name: name
            },

            select: {
                id: true,
                name: true,
                created_at: true
            }
        })

        return category;
    }
}