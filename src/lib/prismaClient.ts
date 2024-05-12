import { Prisma, PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";
export * from "@prisma/client";

const globalPrisma = globalThis as unknown as {prisma:PrismaClient};

export const prisma = 
globalPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : ["error"],
}).$extends(withPulse({
    apiKey: process.env.PULSE_API_KEY as string
}));

export const prismaWithPulse = new PrismaClient().$extends(withPulse({
    apiKey:process.env["PULSE_API_KEY"] as string
}));


if(process.env.NODE_ENV !== "production"){
    globalPrisma.prisma = prisma;
}

// Cacheする必要ないかも
// Timesのデータ取得(force-cache)
// Layoutかpageでrevalidate指定してね
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries
export const getTimes = (async() => {
    const times = await prisma.time.findMany();
    return times;
});

export const getVariable = async () => {
    const variable = await prisma.variable.findUnique({where:{id:0}});
    return variable;
}