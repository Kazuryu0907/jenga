import { getTimes, getVariable, prisma,prismaWithPulse } from '@/lib/prismaClient';
import { onSubmit } from './onSubmit';
import {Form} from './Form';
import {CustomersTable} from './Table';
export const revalidate = 60;


// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  // Variableはid=0で固定
  const [times,variable] = await Promise.all([getTimes(),getVariable()]);
  console.log(times,variable);
  const currentTicketNumber = variable ? variable.current_ticket_number : -1;
  const customers = await prismaWithPulse.customer.findMany();
  return (
    <div>
      <Form onSubmit={onSubmit} times={times} currentTicketNumber={currentTicketNumber}/>
      <h1 className='text-center font-bold text-2xl my-3'>Customers</h1>
      <CustomersTable initCustomers={customers}/>
    </div>
  )
}