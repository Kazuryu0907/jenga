"use client";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Input,Button, NumberInput } from "@mantine/core";
import {EditContext,OpenModalContext,TimesContext,TicketNumberContext} from "./editContext";
import type {ModalType} from "./editContext";
import { addTime, updateTicket,getTimes, updateTime } from "@/lib/serverActionPrisma";
import { Time } from "@prisma/client";
import { notifications } from "@mantine/notifications";

export const EditModal = ({initTimes,initTicketNumber,children}:{initTimes:Time[],initTicketNumber:number,children:React.ReactNode}) => {
  const [opened,{open,close}] = useDisclosure();
  const [editValue,setEditValue] = useState<ModalType>({type:"time",value:"",id:0});
  const [times,setTimes] = useState(initTimes);
  const [ticket,setTicket] = useState(initTicketNumber);

  const showCustomerNotification = (title:string,message:string) => {
    notifications.show({
      title,
      message,
    });
  }
  // *======================ONSUBMIT========== 
  const onSubmit = () => {

    if(editValue.type === "newTime"){
      addTime(editValue.value)
      .then((e) => {
        console.log(e);
        showCustomerNotification("New Time has been added!",`Time:${editValue.value}`);})
      .catch(e => showCustomerNotification("Error Occurred!",e.message));
      // timesを更新
      getTimes().then(times => setTimes(times));

    }else if(editValue.type === "time"){
      updateTime(editValue.id,editValue.value)
      .then(e => {
          console.log(e);
          showCustomerNotification("Time has been updated!",`Time:${editValue.value}`);})
      .catch(e => showCustomerNotification("Error Occurred!",e.message));
      // timesを更新
      getTimes().then(times => setTimes(times));

    }else if(editValue.type === "ticket"){
      updateTicket(editValue.value)
      .then((e) => {
        console.log(e);
        showCustomerNotification("Ticket Number has been updated!",`New Ticket Number:${editValue.value}`);})
      .catch(e => showCustomerNotification("Error Occurred!",e.message));
      // ticketを更新
      setTicket(editValue.value);
    }
    close();
  }
  return(
    <EditContext.Provider value={setEditValue}>
    <OpenModalContext.Provider value={open}>
    <TimesContext.Provider value={times}>
    <TicketNumberContext.Provider value={ticket}>
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
    </TicketNumberContext.Provider>
    </TimesContext.Provider>
    </OpenModalContext.Provider>
    </EditContext.Provider>
  )
}