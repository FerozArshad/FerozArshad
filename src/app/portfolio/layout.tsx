import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Case Studies — Real Builds, Real Deltas",
  description:
    "Selected case studies: $1.1M Shopify rebuild, autonomous n8n support routing (18k tickets/mo), enterprise B2B lead-gen SaaS. Hard numbers, verifiable on request.",
  alternates: { canonical: "https://ferozarshad.com/portfolio" },
  openGraph: {
    title: "Case Studies — Real Builds, Real Deltas",
    description: "Production work from a 7-year independent practice.",
    url: "https://ferozarshad.com/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferozarshad.com" },
          { name: "Portfolio", url: "https://ferozarshad.com/portfolio" },
        ]}
      />
      {children}
    </>
  );
}
