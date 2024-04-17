import { Hono } from 'hono'
import { customers } from './api/customer.route'
import { prismaWithPulse } from "./api/prisma";
import { times } from './api/time.route';

const app = new Hono()
app.get('/', async (c) => {
  const subscription = await prismaWithPulse.customer.subscribe();
  for await (const event of subscription){
    console.log("New Event",event);
  }
  return c.text('Hello Hono!')
})

app.route("/customers",customers);
app.route("/times",times);

export default app
