"use server";
import {prismaWithPulse} from "./prismaClient";

export const delCustomer = async(id:number) => {
    return await prismaWithPulse.customer.delete({where:{id}});
}

export const addTime = async(time:string) => {
    return await prismaWithPulse.time.create({data:{time}});
}

export const updateTicket = async (ticketNumber:number) => {
    return await prismaWithPulse.variable.update({where:{id:0},data:{current_ticket_number:ticketNumber}});
}
export const getTimes = async () => {
    return await prismaWithPulse.time.findMany();
}
export const updateTime = async(id:number,time:string) => {
    return await prismaWithPulse.time.update({where:{id},data:{time}});
}