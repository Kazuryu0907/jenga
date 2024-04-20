import { getTimes, getVariable, prisma } from '@/lib/prismaClient';
import type { Customer,Time } from '@/lib/prismaClient';
import { onSubmit } from './onSubmit';
import {Button} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {Form} from './Form';

import {Success} from './Success';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export const revalidate = 60;

// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  // Variableはid=0で固定
  const [times,variable] = await Promise.all([getTimes(),getVariable()]);
  console.log(times,variable);
  const currentTicketNumber = variable ? variable.current_ticket_number : -1;
  return (
    <div>
      <Form onSubmit={onSubmit} times={times} currentTicketNumber={currentTicketNumber}/>
      <MantineProvider>
        <Notifications/>
        {/* <Button onClick={() => notifications.show({
        title: "Default notifications",
        message: "Hey there, your code is awesome!"
      }) }>Noti Test</Button> */}
      </MantineProvider>
      {/* <Success/> */}
    </div>
  )
}