import type { Lang } from "@/lib/home-i18n";

export type ServiceIcon =
  | "layout"
  | "search"
  | "terminal"
  | "code"
  | "zap"
  | "branch"
  | "target"
  | "globe";

export interface Service {
  icon: ServiceIcon;
  title: string;
  desc: string;
}

export const services: Record<Lang, Service[]> = {
  en: [
    { icon: "layout", title: "WordPress / CMS Development", desc: "Custom themes and CMS builds that clients can actually manage." },
    { icon: "search", title: "SEO Optimization", desc: "Technical SEO that turns rankings into revenue." },
    { icon: "terminal", title: "Python Backend Development", desc: "APIs, data pipelines and services built to scale." },
    { icon: "code", title: "Frontend Development", desc: "Fast, accessible interfaces with Next.js and React." },
    { icon: "zap", title: "AI Automation", desc: "LLM integrations, AI chatbots and workflows that remove busywork." },
    { icon: "branch", title: "n8n Workflow Automation", desc: "Connected systems that run themselves." },
    { icon: "target", title: "Lead Generation Automation", desc: "Pipelines that find, enrich and reach prospects." },
    { icon: "globe", title: "Web & Data Scraping", desc: "Reliable structured data from any source." },
  ],
  es: [
    { icon: "layout", title: "Desarrollo WordPress / CMS", desc: "Temas a medida y CMS que tus clientes pueden gestionar." },
    { icon: "search", title: "Optimización SEO", desc: "SEO técnico que convierte rankings en ingresos." },
    { icon: "terminal", title: "Backend en Python", desc: "APIs, pipelines de datos y servicios escalables." },
    { icon: "code", title: "Desarrollo Frontend", desc: "Interfaces rápidas y accesibles con Next.js y React." },
    { icon: "zap", title: "Automatización con IA", desc: "Integraciones LLM, chatbots y flujos que eliminan trabajo repetitivo." },
    { icon: "branch", title: "Automatización con n8n", desc: "Sistemas conectados que funcionan solos." },
    { icon: "target", title: "Automatización de Lead Gen", desc: "Pipelines que encuentran y contactan prospectos." },
    { icon: "globe", title: "Web & Data Scraping", desc: "Datos estructurados y fiables de cualquier fuente." },
  ],
};
