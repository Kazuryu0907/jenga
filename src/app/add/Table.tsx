"use client";
import { Customer } from "@prisma/client";
import { Table,ActionIcon,ScrollArea } from "@mantine/core";
import {modals} from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";


const openModal = (customer:Customer) => modals.openConfirmModal({
  title: "Delete customer",
  children: (
    <p>Are you sure you want to delete <span className="text-cyan-600 font-bold">{customer.name}</span> ?</p>
  ),
  labels: { cancel: "Cancel", confirm: "Delete" },
  confirmProps:{color:"red"},
  onConfirm: () => {
    console.log("Delete customer with id", customer.id);
  },
  onCancel: () => {},
})

export function CustomersTable({initCustomers}:{initCustomers:Customer[]}) {
  const [customers,setCustomers] = useState(initCustomers);

  const rows = customers.map((c) => (
    <Table.Tr key={c.id}>
      <Table.Td>{c.name}</Table.Td>
      <Table.Td>{c.ticket_number}</Table.Td>
      <Table.Td>{c.timeString}</Table.Td>
      <Table.Td>{c.children + c.adults}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => openModal(c)} variant="filled" color="cyan">
          <IconTrash style={{width:"70%",height:"70%"}} stroke={1.5}/>
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ))
  return (
    <div className="mx-auto w-3/4">
      <ScrollArea h={250} type="auto" scrollbarSize={6}>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Ticket</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Number of people</Table.Th>
              <Table.Th>Delete</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  ) 
}