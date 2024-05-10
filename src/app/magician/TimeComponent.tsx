"use client";

import { Customer } from "@prisma/client";
import {createContext, useState} from "react";
import { Button } from "@mantine/core";
const TimeContext = createContext("");

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

export function TimeComponent({customers}:{customers:Customer[]}){
  const [time,setTime] = useState(customers[0].timeString);
  const splitTimeCustomers = splitTime(customers);
  const splitTimeKeys = splitTimeCustomers.keys();
  const TimeButtons = Array.from(splitTimeKeys).map(time => {
    return <Button key={time} onClick={() => setTime(time)}>{time}</Button>
  });
  console.log(time);
  return(
    <TimeContext.Provider value={time}>
      {TimeButtons}
    </TimeContext.Provider>
  )
}