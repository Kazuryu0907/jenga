import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    const time1 = await prisma.time.upsert({
        where:{id:0},
        update:{},
        create:{
            id:0,
            time: "4/3 12:00",
            customers: {
                create: [
                    {
                        name: "alice",
                        children:0,
                        adults:1,
                        description: "This is a description",
                    }
                ]
            }
        }
    });
    console.log({time1});
}

main().then(async () => {
    await prisma.$disconnect();
    console.log("Seed completed");
    process.exit(0);
}).catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});