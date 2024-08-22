import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

prisma.$connect().then(() => {
    console.log("database coonected.....")
}).catch((err: any) => {
    console.log(err.message)
})

