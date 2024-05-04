"use client";
import { createContext, useContext, useState } from "react";


export const ModalContext = createContext({opened:false,setModal:(n:boolean)=>{}});

export function ModalProvider({children}:{children:React.ReactNode}){
    const [opened,setModal] = useState(false);
    return (
        <ModalContext.Provider value={{opened,setModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModalState(){
    return useContext(ModalContext);
}