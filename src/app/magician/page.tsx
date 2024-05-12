import {Cards} from "./Cards";
import {Customers} from "./Customers";
import {prisma} from "../../lib/prismaClient";
import {TimeComponent} from "./TimeComponent";
import {subscribeFor} from "./subscribe";
import { supabase } from "@/lib/supabaseClient";
// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  const customers = await prisma.customer.findMany({
    orderBy:[
      { ticket_number:"asc" },
      { timeString:"asc" }
    ]
  });
  console.log(`get length:${customers.length}`);
  // subscribeFor();
  return (
    <div>
      {/* <TimeComponent customers={customers}/> */}
      {/* <Cards initCustomers={customers}/> */}
      <Customers initCustomers={customers}/>
    </div>
  )
}