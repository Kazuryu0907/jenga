import {prisma} from "@/lib/prismaClient";

export default async function Home() {
    const customers = prisma.customer.findMany();
    const times = prisma.time.findMany();

    return (
        <div>
            <h1 className="font-bold text-2xl">Customer</h1>
            {(await customers).map((customer,index) => (
                <div key={customer.id} className="bg-gray-800 m-2 w-[300px]">
                    <p>id:{customer.id}</p>
                    <p>name: {customer.name}</p>
                    <p></p>
                </div>
            ))}
        <br />
        </div>
    )
}