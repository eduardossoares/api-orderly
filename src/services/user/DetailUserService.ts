import { prismaClient } from "../../prisma";

export class DetailUserService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                email: true,
                name: true,
                created_at: true,
            }
        })
        return user;
    }
}