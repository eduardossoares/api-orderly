import { prismaClient } from "../../prisma";

export class ListCategoryService {
    async execute() {
        const categoryList = prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return categoryList
    }
}