import { Customer } from "@prisma/client";
import pick from "lodash.pick";

const CheckIcon = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

const Info = ({data}:{data:Customer}) => {
  const getKeys = <T extends {[key:string]: unknown}>(obj:T):(keyof T)[] => {
    return Object.keys(obj);
  }
  const infos = pick(data,["name","timeString","adults","children","description"]);
  return(
    <table className="m-3 w-full text-left">
      <tbody>
        {getKeys(infos).map((key) => (
          <tr key={key} className="border-b">
            <td>{key}</td>
            <td>{infos[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Success({data}:{data:Customer}) {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="w-full bg-gradient-to-t from-slate-200 to-slate-50 rounded-lg shadow ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <span className="text-green-600"><CheckIcon/></span>
              </div>
              <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register Complete🎉
              </h1>
              <div>
                <p className="text-lg font-normal text-gray-500 lg:text-xl">Ticket Number</p>
                <div className="mt-8 flex justify-center"><span className="text-6xl font-extrabold text-blue-600">{data.ticket_number}</span></div>
              </div>
              <div className="border-b-2"></div>
              <div className="text-sm text-gray-500">
                <p className="text-md text-gray-500">Info</p>
                <Info data={data}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}