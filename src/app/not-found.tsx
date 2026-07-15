import Link from "next/link";
import { IconHome, IconMail } from "@tabler/icons-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/images/noise.png')] mix-blend-overlay"></div>

            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 mb-6">404</h1>
            <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">
                The architecture you are looking for has been moved, deleted, or never existed in the first place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                    href="/"
                    className="flex-1 sm:flex-none justify-center px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition flex items-center gap-2 group"
                >
                    <IconHome className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    Return Home
                </Link>
                <Link
                    href="/#contact"
                    className="flex-1 sm:flex-none justify-center px-8 py-4 bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold border border-border rounded-xl transition flex items-center gap-2 group"
                >
                    <IconMail className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
