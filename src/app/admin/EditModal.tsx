"use client";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Input,Button, NumberInput } from "@mantine/core";
import {EditContext,OpenModalContext} from "./editContext";
import type {ModalType} from "./editContext";
export const EditModal = ({children}:{children:React.ReactNode}) => {
  const [opened,{open,close}] = useDisclosure();
  const [editValue,setEditValue] = useState<ModalType>({type:"time",value:"",id:0});

  const onSubmit = () => {
    console.log(editValue);
    close();
  }
  return(
    <EditContext.Provider value={setEditValue}>
    <OpenModalContext.Provider value={open}>
      <Modal opened={opened} onClose={close} title={editValue.type != "newTime" ? "Edit" : "Add Time"}>
        <div>
          {editValue.type === "ticket" ?
          <NumberInput allowNegative={false} allowDecimal={false} value={editValue.value} onChange={(e) => typeof e === "number" ? setEditValue({...editValue,type:"ticket",value:e}) : null}/> 
          : editValue.type === "time" ?
          <Input value={editValue.value} onChange={(e) => setEditValue({...editValue,type:"time",value:e.currentTarget.value})}/>
          :
          <Input value={editValue.value} onChange={(e) => setEditValue({...editValue,type:"newTime",value:e.currentTarget.value})}/>
          }
          <div className="flex mt-3 justify-end">
            <Button variant="default" className="mx-5">Cancel</Button>
            <Button onClick={onSubmit} color="cyan">Submit</Button>
          </div>
        </div>
      </Modal>
      {children}
    </OpenModalContext.Provider>
    </EditContext.Provider>
  )
}