import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SITE_DB_CA } from "./db-ca";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// The database lives on the Hostinger VPS (srv1544660.hstgr.cloud), which
// requires TLS signed by its own CA. `sslaccept=strict` without `sslcert`
// means "verify against that CA": Prisma reads it from a file, so write the
// bundled certificate once per instance and point the URL at it.
function datasourceUrl(): string | undefined {
    const raw = process.env.DATABASE_URL;
    if (!raw) return undefined;
    try {
        const u = new URL(raw);
        if (u.searchParams.get("sslaccept") === "strict" && !u.searchParams.has("sslcert")) {
            const caPath = path.join(os.tmpdir(), "site-db-ca.pem");
            if (!fs.existsSync(caPath)) fs.writeFileSync(caPath, SITE_DB_CA);
            // Prisma cannot read a backslash path (local Windows dev).
            u.searchParams.set("sslcert", caPath.replace(/\\/g, "/"));
        }
        return u.toString();
    } catch {
        return raw;
    }
}

const url = datasourceUrl();

// One client per instance, cached in dev and production (serverless reuse).
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
});

globalForPrisma.prisma = prisma;
