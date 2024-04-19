"use server";
import type { Customer } from "@prisma/client";
import {prisma} from "@/lib/prismaClient";

export type submitResponse = {
    isSuccess: boolean;
    data?: Customer;
    // Errorはtypescript的にany
    errorMessage?: any;
}

export const onSubmit = async(prevState:any,queryData:FormData) => {
    // This is Server Action
    // HTMLで制御できてるので，ハードコーディング
    const timeString = queryData.get("time") as string;
    const name = queryData.get("name") as string;
    const adults = Number(queryData.get("adults") as string);
    const children = Number(queryData.get("children") as string);
    const description = queryData.get("description") as string | null;

    console.log(timeString,name,adults,children,description);
    let response:submitResponse = {isSuccess:false};
    try{
        const newCustomer = await prisma.customer.create({
            data: {name,timeString,adults,children,description},
        });
        response.isSuccess = true;
        response.data = newCustomer;
    }catch(e){
        response.isSuccess = false;
        response.errorMessage = e as string;
        console.error(e);
    }
    console.log(response);
    return JSON.stringify(response);
};