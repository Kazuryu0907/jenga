

export  function Success({ticketNumber}:{ticketNumber:number|undefined}) {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="w-full bg-white rounded-lg shadow ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register Complete🎉
              </h1>
              <div>
                <p className="text-lg font-normal text-gray-500 lg:text-xl">Ticket Number</p>
                <div className="mt-6 flex justify-center"><span className="text-6xl font-extrabold text-blue-600">{11}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}