const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tables = await prisma.$queryRaw`SHOW TABLES;`;
    console.log(tables);
}

main().catch(console.error).finally(() => prisma.$disconnect());
