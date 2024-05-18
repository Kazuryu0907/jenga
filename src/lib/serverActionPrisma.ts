"use server";
import {prismaWithPulse} from "./prismaClient";

export const delCustomer = async(id:number) => {
    return await prismaWithPulse.customer.delete({where:{id}});
}