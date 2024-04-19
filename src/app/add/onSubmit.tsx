import type { Customer } from "@prisma/client";
import {prisma} from "@/lib/prismaClient";


const addCustomer = async ({name,timeString,adults,children,description}:Pick<Customer,"name"|"timeString"|"adults"|"children"|"description">) => {
    const newCustomer = await prisma.customer.create({
        data: {name,timeString,adults,children,description},
    });
    return newCustomer;
}

export const onSubmit = async(event:FormData) => {
    "use server";
    // This is Server Action
    // HTMLで制御できてるので，ハードコーディング
    const timeString = event.get("time") as string;
    const name = event.get("name") as string;
    const adults = Number(event.get("adults") as string);
    const children = Number(event.get("children") as string);
    const description = event.get("description") as string | null;

    console.log(timeString,name,adults,children,description);
    const newCustomer = await prisma.customer.create({
        data: {name,timeString,adults,children,description},
    });
    console.log(newCustomer);
};