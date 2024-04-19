import { Prisma, PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const globalPrisma = globalThis as unknown as {prisma:PrismaClient};

export const prisma = 
globalPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : ["error"],
});

if(process.env.NODE_ENV === "production"){
    globalPrisma.prisma = prisma;
}