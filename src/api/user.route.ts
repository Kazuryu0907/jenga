import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";

const app = new Hono();
const prisma = new PrismaClient();

export const customers = app.get("/",async (c) => {
    const getUsers = await prisma.customer.findMany();
    return c.json(getUsers);
});