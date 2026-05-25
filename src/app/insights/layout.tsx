import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Insights — Notes From the Build",
  description:
    "Field notes on shipping SaaS, AI automation, and commerce as a solo operator. New posts most months.",
  alternates: { canonical: "https://ferozarshad.com/insights" },
  openGraph: {
    title: "Insights — Notes From the Build",
    description: "Field notes on shipping SaaS, AI automation, and commerce.",
    url: "https://ferozarshad.com/insights",
    type: "website",
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://ferozarshad.com" },
          { name: "Insights", url: "https://ferozarshad.com/insights" },
        ]}
      />
      {children}
    </>
  );
}
