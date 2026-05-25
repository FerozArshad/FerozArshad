import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Services — SaaS, AI Automation, Headless Commerce",
  description:
    "Productized engagements: $8k 4-week sprints, $25k+ multi-month builds, $5k/mo retainer. Full-stack SaaS, AI workflows, headless commerce, custom web design.",
  alternates: { canonical: "https://ferozarshad.com/services" },
  openGraph: {
    title: "Services — SaaS, AI Automation, Headless Commerce",
    description: "Productized engagements with outcome pricing and weekly Friday demos.",
    url: "https://ferozarshad.com/services",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferozarshad.com" },
          { name: "Services", url: "https://ferozarshad.com/services" },
        ]}
      />
      {children}
    </>
  );
}
