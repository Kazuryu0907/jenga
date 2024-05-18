"use client";
import { Table,ScrollArea } from "@mantine/core";
import {Time} from "@prisma/client";
import { IconEdit, IconCirclePlus } from "@tabler/icons-react"
import {ActionIcon, Input, NumberInput} from "@mantine/core";
import {modals} from "@mantine/modals";
import { useState ,Dispatch,SetStateAction, useContext} from "react";
import {EditContext,OpenModalContext,TimesContext,TicketNumberContext} from "./editContext";

const FormModal = ({currentValue,setValue}:{currentValue:string|number,setValue:Dispatch<SetStateAction<string>>}) => {
  return (
    <div>
      {typeof currentValue === "string" ? <Input defaultValue={currentValue} onChange={(e) => setValue(e.currentTarget.value)}/> :  <NumberInput defaultValue={currentValue}/>}
    </div>
   )
}


export const TimeTable = () => {
  const setEditValue = useContext(EditContext);
  const openModal = useContext(OpenModalContext);
  const times = useContext(TimesContext);
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

export const TicketTable = () => {
  const setEditValue = useContext(EditContext);
  const openModal = useContext(OpenModalContext);
  const currentTicketNum = useContext(TicketNumberContext);
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