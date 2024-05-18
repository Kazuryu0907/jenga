import { createContext } from "react";

export type ModalType = {type:"time",value:string,id:number} | {type:"ticket",value:number,id:number} | {type:"newTime",value:string};

export const EditContext = createContext({} as React.Dispatch<React.SetStateAction<ModalType>>);
export const OpenModalContext = createContext({} as React.Dispatch<React.SetStateAction<boolean>>);
