import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Limit connection pool to 2 connections to prevent process explosion on shared hosting
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
});

// Cache the client in production to prevent creating new instances on every request
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Also cache in production (critical for serverless/shared hosting)
if (process.env.NODE_ENV === "production") globalForPrisma.prisma = prisma;
