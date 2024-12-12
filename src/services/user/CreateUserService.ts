import { prismaClient } from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        if(!name) throw new Error("invalid name!");
        if(!email) throw new Error("invalid email!");
        if(!password) throw new Error("invalid password!");

        const emailAlreadyRegistered = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(emailAlreadyRegistered) throw new Error("email already exists!");

        const passwordHash = await hash(password, 8);

        const user = prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },

            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}