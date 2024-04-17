import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    const time1 = await prisma.time.upsert({
        where:{time:"4/3 12:00"},
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
                    },
                    {
                        name: "lll",
                        children:2,
                        adults:2,
                    }
                ]
            }
        }
    });
    const time2 = await prisma.time.upsert({
        where:{time:"4/3 12:30"},
        update:{},
        create:{
            id:1,
            time: "4/3 12:30",
            customers: {
                create: [
                    {
                        name: "bob",
                        children:1,
                        adults:0,
                        description: "Second description",
                    }
                ]
            }
        }
    });
    console.log({time1,time2});
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