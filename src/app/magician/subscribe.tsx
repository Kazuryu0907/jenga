"use server"
import { prismaWithPulse } from "@/lib/prismaClient";
import type { Customer } from "@prisma/client";
import type {PulseSubscription,PulseCreateEvent} from "@prisma/extension-pulse";

//* Client Componentでstopしたいから分離
// プリミティブな値しかServer Client間でやり取りできなかった；；
// export async function createSubscribe(){
//   const subscription = await prismaWithPulse.customer.subscribe({
//     create:{},
//   });
//   return subscription;
// }

export type subscriptionType = PulseSubscription<PulseCreateEvent<Customer>>;

let subscription: null | subscriptionType;
//* Clientから呼び出せるよ
export async function subscribeFor(){
  if(!subscription){
    subscription = await prismaWithPulse.customer.subscribe({
      create:{},
    });
  }

  //? これでCreateだけsubscribeできる？
  if(subscription instanceof Error){
    throw subscription;
  }
  for await(const event of subscription){
    console.log("just received an event:",event)
    // callback実行
  }
}

export async function fetchAllCustomers(){
  const customers = await prismaWithPulse.customer.findMany({
    orderBy:[
      { ticket_number:"asc"},
      { timeString:"asc" }
    ]
  });
  return customers;
}

export async function updateCheckedById(id:number){
  const customer = await prismaWithPulse.customer.findUnique({
    where:{id},
  });
  const updatedCustomer = await prismaWithPulse.customer.update({
    where:{id},
    data:{checked:!customer?.checked},
  });
  return updatedCustomer;
}