import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — One Operator, No Agency",
  description:
    "Seven years as a one-person engineering, design & strategy practice. Karachi · UTC+5. Mutual NDA up front, full IP on delivery, weekly Friday demos.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Feroz Arshad",
    description: "Independent engineer, designer & strategist since 2019.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      {children}
    </>
  );
}
