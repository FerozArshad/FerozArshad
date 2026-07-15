import type { Metadata } from "next";
import Portfolio from "@/components/home/Portfolio";
import "./home-design.css";

export const metadata: Metadata = {
  title: "Feroz Arshad — Full-Stack Developer & AI Automation",
  description:
    "Full-stack developer with a focus on AI automation, web scraping, and building digital systems that generate real business impact.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Feroz Arshad — Full-Stack Developer & AI Automation",
    description:
      "Full-stack developer with a focus on AI automation, web scraping, and building digital systems that generate real business impact.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return <Portfolio />;
}
