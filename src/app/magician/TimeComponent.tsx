"use client";

import { Customer } from "@prisma/client";
import {createContext, useState} from "react";
import { Button } from "@mantine/core";
export const TimeContext = createContext("");

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

export function TimeComponent({customers,children}:{customers:Customer[],children:React.ReactNode}){
  const [time,setTime] = useState(customers[0].timeString);
  const splitTimeCustomers = splitTime(customers);
  const splitTimeKeys = splitTimeCustomers.keys();
  const TimeButtons = Array.from(splitTimeKeys).map(t => {
    const customerSum = splitTimeCustomers.get(t)?.reduce((acc,c) => acc + c.children + c.adults,0);
    return (
      <Button key={t} onClick={() => setTime(t)} color={time != t ? "gray" : "blue"}>
        {customerSum}人<br/>
        {t}
      </Button>
    )
  });
  return(
    <TimeContext.Provider value={time}>
      {TimeButtons}
      {children}
    </TimeContext.Provider>
  )
}