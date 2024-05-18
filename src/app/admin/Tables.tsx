"use client";
import { Table,ScrollArea } from "@mantine/core";
import {Time} from "@prisma/client";
import { IconEdit, IconCirclePlus } from "@tabler/icons-react"
import {ActionIcon, Input, NumberInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import { useState ,Dispatch,SetStateAction, useContext, use} from "react";
import {EditContext,OpenModalContext} from "./editContext";

const FormModal = ({currentValue,setValue}:{currentValue:string|number,setValue:Dispatch<SetStateAction<string>>}) => {
  return (
    <div>
      {typeof currentValue === "string" ? <Input defaultValue={currentValue} onChange={(e) => setValue(e.currentTarget.value)}/> :  <NumberInput defaultValue={currentValue}/>}
    </div>
   )
}

// ! contextModalで，useFormでも使う
const modal = (currentValue:string|number,value:string,setValue:Dispatch<SetStateAction<string>>) => modals.openConfirmModal({
  title: "Edit",
  children: (
    // <div>
    //   {typeof currentValue === "string" ? <Input defaultValue={currentValue}/> :  <NumberInput defaultValue={currentValue}/>}
    // </div>
    <FormModal currentValue={currentValue} setValue={setValue}/>
  ),
  labels: { cancel: "Cancel", confirm: "Submit" },
  onConfirm: () => {console.log(value)},
  confirmProps:{color:"cyan"},
});

export const TimeTable = ({times}:{times:Time[]}) => {
  const setEditValue = useContext(EditContext);
  const openModal = useContext(OpenModalContext);
  const clickHandler = (time:Time) => {
    setEditValue({type:"time",value:time.time,id:time.id});
    openModal(true);
  }
  const newTimeClickHandler = () => {
    setEditValue({type:"newTime",value:""});
    openModal(true);
  }
  const rows = times.map((t) => (
    <Table.Tr key={t.id}>
      <Table.Td>{t.time}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => clickHandler(t)} variant="filled" color="cyan">
          <IconEdit style={{width:"70%",height:"70%"}} stroke={1.5}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
  const addRow = () => (
    <Table.Tr>
      <Table.Td>Add New Time</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => newTimeClickHandler()} variant="filled" color="orange">
          <IconCirclePlus style={{width:"70%",height:"70%"}} stroke={1.5}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
  
  return (
    <div className="mx-auto">
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Time</Table.Th>
            <Table.Th>Edit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
          {addRow()}
        </Table.Tbody>
      </Table>
    </div>
  )
}

export const TicketTable = ({currentTicketNum}:{currentTicketNum:number}) => {
  const setEditValue = useContext(EditContext);
  const openModal = useContext(OpenModalContext);
  const clickHandler = () => {
    // VariableTableのidは0固定
    setEditValue({type:"ticket",value:currentTicketNum,id:0});
    openModal(true);
  }
  const Rows = () => (
    <Table.Tr>
      <Table.Td>{currentTicketNum}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => clickHandler()} variant="filled" color="cyan">
          <IconEdit style={{width:"70%",height:"70%"}} stroke={1.5}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
  return (
    <div className="mx-auto">
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Current Ticket</Table.Th>
            <Table.Th>Edit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody><Rows/></Table.Tbody>
      </Table>
    </div>
  )
}