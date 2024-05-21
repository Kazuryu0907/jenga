"use client";
import { createContext, useState, Dispatch,SetStateAction} from "react";
import type { Customer, } from "@prisma/client";


export type CustomerContextType = [Customer[],Dispatch<SetStateAction<Customer[]>>];
export const CustomerContext = createContext<CustomerContextType>([[],() => {}]);

export function CustomerWrapper({initCustomers,children}:{initCustomers:Customer[],children:React.ReactNode}){
    const states = useState(initCustomers);
    
    return(
        <CustomerContext.Provider value={states}>
            {children}
        </CustomerContext.Provider>
    )

}