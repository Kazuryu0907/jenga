import {Customers} from "./Customers";
import {prisma} from "../../lib/prismaClient";
// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  const customers = await prisma.customer.findMany({
    orderBy:[
      { ticket_number:"asc" },
      { timeString:"asc" }
    ]
  });

  return (
    <div>
      <Customers initCustomers={customers}/>
    </div>
  )
}