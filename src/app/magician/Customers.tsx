"use client";
import type {Customer} from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchAllCustomers } from "./subscribe";
import { supabase } from "@/lib/supabaseClient";
import { TimeComponent,TimeContext } from "./TimeComponent";
import { Cards } from "./Cards";
import {notifications} from "@mantine/notifications";

const showCustomerNotification = (customer:Customer) => {
  notifications.show({
    title:"New Customer has added!",
    message:`Ticket:${customer.id} Name:${customer.name} Time:${customer.timeString}`
  });
}


export function Customers({initCustomers}:{initCustomers:Customer[]}){
  // originalCustomersはsortedのつもり
  const [customers,setCustomers] = useState(initCustomers);
  //! TimeごとのCustomer合計の表示 
  // Subscriptionの起動
  useEffect(() => {
    const channel = supabase.channel("Customer");
    channel.on("postgres_changes",{event:"INSERT",schema:"public",table:"Customer"},(payload) => {
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
        console.log(c);
        setCustomers(c);
      })
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    }
  },[]);

  return(
    <div>
      <TimeComponent customers={customers}>
        <Cards customers={customers} setCustomers={setCustomers}/>
      </TimeComponent>
    </div>
  );
}