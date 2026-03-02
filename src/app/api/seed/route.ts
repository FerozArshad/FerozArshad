import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    try {
        // SECURITY: Check if admin already exists to prevent an attacker from creating a new admin.
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "contact@ferozarshad.com" }
        });

        if (existingAdmin) {
            return NextResponse.json({ error: "Admin already exists. Seeding disabled." }, { status: 403 });
        }

        // Hash the secure password provided earlier
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("secure-admin-pass-2024!", salt);

        const admin = await prisma.user.create({
            data: {
                name: "Feroz Arshad",
                email: "contact@ferozarshad.com",
                password: hashedPassword
            }
        });

        return NextResponse.json({ message: "Admin seeded successfully. You can now login.", email: admin.email });
    } catch (error) {
        console.error("Seed error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
