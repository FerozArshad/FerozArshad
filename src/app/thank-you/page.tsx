import Link from "next/link";
import { IconCheck, IconHome } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You | Feroz Arshad",
    robots: { index: false, follow: false } // Prevent SEO indexing of the thank you page
};

export default function ThankYouPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative z-10">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 text-green-500 mb-8 ring-1 ring-green-500/20">
                <IconCheck className="w-12 h-12" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Transmission Received.</h1>
            <p className="text-neutral-400 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                Thank you for reaching out. Your inquiry has been successfully routed to my secure CRM.
                I review all enterprise architecture requests personally and will be in touch within 24 hours.
            </p>

            <Link
                href="/"
                className="inline-flex px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl transition items-center gap-2 group"
            >
                <IconHome className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                Return to Homepage
            </Link>
        </div>
    );
}
