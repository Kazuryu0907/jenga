"use client";
import { createContext, useState, Dispatch,SetStateAction, useEffect} from "react";
import type { Customer, } from "@prisma/client";
import { getCustomers } from "@/lib/serverActionPrisma";
import { supabase } from "@/lib/supabaseClient";


export type CustomerContextType = [Customer[],Dispatch<SetStateAction<Customer[]>>];
export const CustomerContext = createContext<Customer[]>([]);
// ! DeleteがError吐きよるので緊急避難
export const SetCustomerContext = createContext<Dispatch<SetStateAction<Customer[]>>>(() => {});

export function CustomerWrapper({initCustomers,children}:{initCustomers:Customer[],children:React.ReactNode}){
  const [customers,setCustomers] = useState(initCustomers);
  useEffect(() => {
    const channel = supabase.channel("CustomerWrapper");
    // 全部Listen
    channel.on("postgres_changes",{event:"INSERT",schema:"public",table:"Customer"},(payload) => {
      console.log("Payload Here");
      console.log(payload);
      // 変にCustomerの順番いじらないほうがよさそうだからこっち 
      getCustomers().then(c => {
        setCustomers(c);
      })
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    }
  },[])
  return(
    <CustomerContext.Provider value={customers}>
      <SetCustomerContext.Provider value={setCustomers}>
      {children}
      </SetCustomerContext.Provider>
    </CustomerContext.Provider>
  )

}