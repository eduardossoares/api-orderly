import { prismaClient } from "../../prisma";

export class DeleteCategoryService {
    async execute(id: string) {
        if(!id) throw new Error("invalid id");

        const category = await prismaClient.category.findFirst({
            where: {
                id: id
            }
        });

        if(!category) throw new Error("category no exists");

        await prismaClient.category.delete({
            where: {
                id: id
            }
        });

        return { message: "category successfully deleted!" }
    }
}