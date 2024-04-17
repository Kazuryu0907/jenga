import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/",async (c) => {
    const getUsers = await prisma.customer.findMany();
    return c.json(getUsers);
});

app.get("/id",async (c) => {
    const getCustomers = await prisma.customer.findMany({
        where: {
            timeString: "4/3 12:00"
        }
    });
    return c.json(getCustomers);
})
export const customers = app;