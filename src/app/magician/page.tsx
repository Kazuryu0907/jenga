
// こいつはServer ComponentだからAsyncが使える
export default async function Home() {
  // const customers = await prisma.customer.findMany({
  //   orderBy:{
  //     timeString:"asc"
  //   }
  // });
  // console.log(customers);
  return (
    <div>
      Hello!
      <div>
        <div className="flex flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
          <div className="w-1/4 h-full flex items-center rounded-l-lg justify-center bg-[#F5F5F5]  text-center md:h-auto">
            <p className="my-auto text-5xl text-[#222B32] font-bold">25</p>
          </div>
          <div className="w-3/4 rounded-r-lg flex flex-col bg-[#222B32] justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#F5F5F5] ">うゆゆ様</h5>
            <p className="mb-3 font-normal text-gray-300">Here are the biggest unchi.</p>
          </div>
        </div>
      </div>
    </div>
  )
}