"use client";
import type {Customer} from "@prisma/client";
import SumiSVG from "./sumi.svg";
import { useEffect, useState } from "react";
import { fetchAllCustomers, subscribeFor, updateCheckedById } from "./subscribe";
import { supabase } from "@/lib/supabaseClient";

import {notifications} from "@mantine/notifications";

const CustomerCard = ({customer,onClick}:{customer:Customer,onClick:()=>void}) => {
  const {ticket_number,name,description,children,adults,checked} = customer;
  return(
    <div onClick={onClick} className="group flex  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
      <div className="w-1/4 flex items-center rounded-l-lg justify-center bg-[#F5F5F5] group-hover:bg-[#222B32] text-center h-auto">
        {!checked ? 
        <p className="my-auto text-5xl text-[#222B32] group-hover:text-[#F5F5F5] font-bold">{ticket_number}</p>
        :
        <div className="w-3/4 rotate-[30deg]"><SumiSVG/></div>
        }
      </div>
      <div className="w-3/4 rounded-r-lg flex flex-col bg-[#222B32] justify-between p-4 leading-normal group-hover:bg-[#F5F5F5]">
        <h5 className="mb-2 text-3xl font-mono tracking-tight text-[#F5F5F5] group-hover:text-[#222B32]">{name}様</h5>
        <div className="mb-2 flex text-xl tracking-tight text-gray-300 group-hover:text-gray-700">
          <p className="text-2xl text-[#F5F5F5] font-bold group-hover:text-[#222B32]">{children+adults}人</p>
          <p className="ml-auto">👶:{children} 🧑:{adults}</p>
        </div>
        <p className="font-normal text-gray-300 group-hover:text-gray-700">{description}</p>
      </div>
    </div>
  )
}

const originalCustomers:Customer[] = [
  {
    id: 54,
    name: 'uni',
    ticket_number: 23,
    children: 4,
    adults: 2,
    checked: false,
    description: '',
    created_at: new Date(),
    timeString: '12/12 00:00'
  },
  {
    id: 47,
    name: 'wat',
    ticket_number: 16,
    children: 1,
    adults: 4,
    checked: true,
    description: 'hello',
    created_at: new Date(),
    timeString: '4/3 12:00'
  },
  {
    id: 1,
    name: 'alice',
    ticket_number: 1,
    children: 0,
    adults: 1,
    checked: false,
    description: 'This is a description',
    created_at: new Date(),
    timeString: '4/3 12:00'
  },
  {
    id: 48,
    name: 'huf',
    ticket_number: 17,
    children: 2,
    adults: 12,
    checked: false,
    description: '',
    created_at:new Date(), 
    timeString: '4/3 12:00'
  },
  {
    id: 49,
    name: '12',
    ticket_number: 18,
    children: 2,
    adults: 1,
    checked: false,
    description: '',
    created_at:new Date(), 
    timeString: '4/3 12:00'
  },
  {
    id: 53,
    name: 'jack',
    ticket_number: 22,
    children: 3,
    adults: 2,
    checked: false,
    description: '',
    created_at:new Date(), 
    timeString: '4/3 12:00'
  },
  {
    id: 51,
    name: 'kjlsfdjlsfdklj',
    ticket_number: 20,
    children: 22,
    adults: 11,
    checked: false,
    description: '',
    created_at: new Date(),
    timeString: '4/3 12:30'
  },
  {
    id: 38,
    name: '2',
    ticket_number: 9,
    children: 2,
    adults: 11,
    checked: false,
    description: '',
    created_at: new Date(),
    timeString: '4/3 12:30'
  },
  {
    id: 40,
    name: 'fucking',
    ticket_number: 10,
    children: 2,
    adults: 3,
    checked: false,
    description: '',
    created_at: new Date(),
    timeString: '4/3 12:30'
  },
  {
    id: 41,
    name: 'fucking',
    ticket_number: 11,
    children: 2,
    adults: 3,
    checked: false,
    description: '',
    created_at: new Date(),
    timeString: '4/3 12:30'
  },
  {
    id: 2,
    name: 'bob',
    ticket_number: 2,
    children: 1,
    adults: 0,
    checked: false,
    description: 'Second description',
    created_at: new Date(),
    timeString: '4/3 12:30'
  }
]

const showCustomerNotification = (customer:Customer) => {
  notifications.show({
    title:"New Customer has added!",
    message:`Ticket:${customer.id} Name:${customer.name} Time:${customer.timeString}`
  });
}

const splitTime = (customers:Customer[]) => {
  const splitCustomers = new Map<string,Customer[]>();
  customers.map(c => {
    let customers = splitCustomers.get(c.timeString);
    if(!customers){
      // 初回は[customer]を挿入
      splitCustomers.set(c.timeString,[c]);
    }
    else{
      customers.push(c);
      splitCustomers.set(c.timeString,customers);
    }
  })
  return splitCustomers;
}

export function Cards({initCustomers}:{initCustomers:Customer[]}){
  // originalCustomersはsortedのつもり
  const [customers,setCustomers] = useState(initCustomers);
  //! TimeごとのCustomer合計の表示 
  // Subscriptionの起動
  useEffect(() => {
    supabase.channel("Customer").on("postgres_changes",{event:"INSERT",schema:"public",table:"Customer"},(payload) => {
      //* 更新時
      console.log(`New Customer!:${payload.new.name}`);
      fetchAllCustomers().then(c => {
        // これだとO(n)で処理できそう
        // idはuniqueかつnumberなので，足し合わせて差分でid取得
        const preIdSum = customers.reduce((acc,c) => acc + c.id,0);
        const newIdSum = c.reduce((acc,_c) => acc + _c.id,0);
        const newAddedId = newIdSum - preIdSum; 
        console.log(newAddedId);
        const newAddedCustomer = c.filter(_c => _c.id == newAddedId)[0];
        console.log(newAddedCustomer);
        // Notificationを表示
        showCustomerNotification(newAddedCustomer);
        setCustomers(c);
      })
    }).subscribe();
  },[]);

  const splitTimeCustomers = splitTime(customers);
  const splitTimeKeys = splitTimeCustomers.keys();

  //* =======HandleClick====================== 
  const updateCustomers = (id:number) => {
    // クリックされたStateのcheckedを反転させる
    const changedCheckedCustomer = customers.map(c => (c.id == id ? {...c,checked:!c.checked} : c));
    setCustomers(changedCheckedCustomer);
  }
  const onClickHandle = async(id:number) => {
    //TODO ErrorHandling未実装
    updateCustomers(id);
    const res = await updateCheckedById(id).catch(c => {console.error(c.message)});
    console.log(res);
  }

  // Mapのkeyを使ってCustomerCardを作る(Mapだとmap使えなかったからArrayに変換して使った)
  const SplitTimeCustomersCard = Array.from(splitTimeKeys).map(time => {
    const splitCustomers = splitTimeCustomers.get(time);
    return(
      <div key={time}>
        <h1>{time}</h1>
        <div>
        {splitCustomers && splitCustomers.map(c => {
            return(
            <div className="mb-1" key={c.id}>
            {/* idが一致したCustomerのcheckedのみを反転させるFunction */}
              <CustomerCard onClick={() => onClickHandle(c.id)} key={c.id} customer={c}/>
            </div>
            )
        }
        )}
        </div>
      </div>
    )
  })
  return(
    <div>
      {SplitTimeCustomersCard}
    </div>
  );
}