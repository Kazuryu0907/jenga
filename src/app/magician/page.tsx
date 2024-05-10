import {Cards} from "./Cards";
import {prisma} from "../../lib/prismaClient";
import {subscribeFor} from "./subscribe";
import { supabase } from "@/lib/supabaseClient";
// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  const customers = await prisma.customer.findMany({
    orderBy:[
      { ticket_number:"asc"},
      { timeString:"asc" }
    ]
  });
  console.log(`get length:${customers.length}`);
  // subscribeFor();
  return (
    <div>
      <Cards initCustomers={customers}/>
    </div>
  )
}