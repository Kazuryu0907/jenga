import type { Customer, Time } from '@prisma/client';
import { Button } from '@mantine/core';
import { useContext } from 'react';
import { CustomerContext } from './CustomerWrapper';

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

export const TimeComponent = ({times}:{times:Time[]}) => {
  const [customers,setCustomers] = useContext(CustomerContext);
  const splitTimeCustomers = splitTime(customers);
  const TimeButtons = times.map(t => {
    const customerSum = splitTimeCustomers.get(t.time)?.reduce((acc,c) => acc + c.children + c.adults,0);
    return (
      <Button key={t.time} variant="light">
        {customerSum ?? 0}人<br/>
        {t.time}
      </Button>
    )});
  return (
    <div className="flex flex-wrap justify-center justify-items-center max-w-md mb-2">
      {TimeButtons}
    </div>
  )
}