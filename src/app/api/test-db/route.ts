import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET() {
    try {
        const urlProperty = process.env.DATABASE_URL || "NOT_SET";
        const maskedUrl = urlProperty.includes("@")
            ? urlProperty.replace(/:[^:@]+@/, ":***@")
            : urlProperty;

        const prismaLocal = new PrismaClient({
            datasources: { db: { url: urlProperty } },
            log: ['query', 'info', 'warn', 'error'],
        });

        const start = Date.now();
        // Fire a basic query to force the connection pool to open
        await prismaLocal.$queryRaw`SELECT 1`;
        const end = Date.now();

        await prismaLocal.$disconnect();

        return NextResponse.json({
            success: true,
            status: "Connected successfully to MariaDB!",
            database_url_configured: maskedUrl,
            connection_time_ms: end - start
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error_message: error.message,
            error_name: error.name,
            error_code: error.code,
            database_url_configured: process.env.DATABASE_URL ? "SET_BUT_MASKED" : "NOT_SET",
            stack: error.stack
        }, { status: 500 });
    }
}
