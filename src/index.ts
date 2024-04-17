import { Hono } from 'hono'
import { customers } from './api/user.route'
import {prisma} from "./api/prisma";
import { times } from './api/time.route';

const app = new Hono()
app.get('/', async (c) => {
  // const subscription = await prisma.notification.subscribe();
  // for await (const event of subscription){
  //   console.log("New Event",event);
  // }
  return c.text('Hello Hono!')
})

app.route("/users",customers);
app.route("/times",times);

export default app
