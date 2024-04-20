import { getTimes, prisma } from '@/lib/prismaClient';
import type { Customer,Time } from '@/lib/prismaClient';
import { onSubmit } from './onSubmit';
import {Button} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {Form} from './Form';

import {Success} from './Success';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  const times = await getTimes();
  console.log(times);
  return (
    <div>
      <Form onSubmit={onSubmit} times={times}/>
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