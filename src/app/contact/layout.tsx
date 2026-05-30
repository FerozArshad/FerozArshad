import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Contact — Send a Brief",
  description:
    "Reply within 1 business day. NDA on first call. Scoped proposal in your inbox inside 48 hours. info@ferozarshad.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Send Feroz a brief",
    description: "Reply within 1 business day. Scoped proposal inside 48 hours.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      {children}
    </>
  );
}
