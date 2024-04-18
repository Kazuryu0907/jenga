import { Hono } from 'hono'
import { customers } from './api/customer.route'
import { times } from './api/time.route';

const app = new Hono()
app.get('/', async (c) => {
  return c.text('Hello Hono!')
})

app.route("/customers",customers);
app.route("/times",times);

export default app
