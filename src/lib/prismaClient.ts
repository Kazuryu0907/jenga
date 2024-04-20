import { Prisma, PrismaClient } from "@prisma/client";
import {cache} from "react";
import useSWR from "swr";

export * from "@prisma/client";

const globalPrisma = globalThis as unknown as {prisma:PrismaClient};

export const prisma = 
globalPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn"] : ["error"],
});

if(process.env.NODE_ENV === "production"){
    globalPrisma.prisma = prisma;
}

// Timesのデータ取得(force-cache)
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries
export const getTimes = cache(async() => {
    const times = await prisma.time.findMany();
    return times;
});
