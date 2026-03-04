const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Attempting to insert dummy lead...");
    const lead = await prisma.lead.create({
        data: {
            name: "Vercel Debugger",
            email: "debug@vercel.com",
            service: "AI Automation",
            message: "Testing if the DB allows inserts from local."
        }
    });
    console.log("Success! Inserted Lead:", lead);

    const count = await prisma.lead.count();
    console.log("Total leads in DB:", count);
}

main().catch(console.error).finally(() => prisma.$disconnect());
