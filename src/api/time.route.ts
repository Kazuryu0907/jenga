import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";


const app = new Hono();
const prisma = new PrismaClient();

export const times = app.get("/",async (c)=>{
    const getTimes = await prisma.time.findMany();
    return c.json(getTimes);
})