import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — One Operator, No Agency",
  description:
    "Seven years as a one-person engineering, design & strategy practice. Karachi · UTC+5. Mutual NDA up front, full IP on delivery, weekly Friday demos.",
  alternates: { canonical: "https://ferozarshad.com/about" },
  openGraph: {
    title: "About Feroz Arshad",
    description: "Independent engineer, designer & strategist since 2019.",
    url: "https://ferozarshad.com/about",
    type: "profile",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferozarshad.com" },
          { name: "About", url: "https://ferozarshad.com/about" },
        ]}
      />
      {children}
    </>
  );
}
