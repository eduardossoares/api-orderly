import { prismaClient } from "../../prisma";

interface CreateProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

export class CreateProductService {
    async execute({name, price, description, banner, category_id}: CreateProductRequest) {

        if(!name) throw new Error("invalid name!");
        if(!price) throw new Error("invalid price!");
        if(!description) throw new Error("invalid description!");
        if(!banner) throw new Error("invalid banner!");
        if(!category_id) throw new Error("invalid category_id!");

        const isProductAlreadyRegistered = await prismaClient.product.findFirst({
            where: {
                name: name
            }
        });

        const isCategoryIdExists = await prismaClient.category.findFirst({
            where: {
                id: category_id,
            }
        });

        if(!isCategoryIdExists) throw new Error("invalid category id");
        if(isProductAlreadyRegistered) throw new Error("product already exists!")

        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            },

            select: {
                name: true,
                price: true,
                description: true,
                banner: true,
            },
        });

        return product;
    }
}