import { prismaClient } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}


export class AuthUserService {
    async execute({email, password}: AuthRequest) {
        if(!email) throw new Error("invalid email!");
        if(!password) throw new Error("invalid password!");

        // Puxando os dados do usuário no banco de dados;
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });
        if(!user) throw new Error("invalid email/password!");

        // Verificando a senha passada pelo usuário;
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new Error("invalid email/password!");

        // Considerando que tudo deu certo, prosseguimos;
        const token = sign(
            {
                name: user.name,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                subject: user.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}