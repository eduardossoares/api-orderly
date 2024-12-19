import { prismaClient } from "../../prisma";

interface newNameRequest {
    id: string;
    name: string;
}

export class EditCategoryService {
    async execute({id, name}: newNameRequest) {
        if(!id) throw new Error("invalid name!");
        if(!name) throw new Error("invalid new name!");
        
        const category = await prismaClient.category.update({
            where: {
                id: id
            },

            data: {
                name: name
            },

            select: {
                name: true
            }
        });

        if(!category) throw new Error("invalid category!");

        return { message: "category successfully edited!" };
    }
}