import { prismaClient } from "../../prisma";

export class DetailUserService {
    async execute() {
        return { ok: true };
    }
}