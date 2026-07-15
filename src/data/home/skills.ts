export type SkillIcon =
  | "globe"
  | "search"
  | "terminal"
  | "package"
  | "code"
  | "branch"
  | "cpu"
  | "database"
  | "layout";

export interface Skill {
  name: string;
  icon: SkillIcon;
}

export const skills: Skill[] = [
  { name: "WordPress", icon: "globe" },
  { name: "SEO", icon: "search" },
  { name: "Python", icon: "terminal" },
  { name: "Next.js", icon: "package" },
  { name: "React", icon: "code" },
  { name: "JavaScript", icon: "code" },
  { name: "TypeScript", icon: "code" },
  { name: "Node.js", icon: "terminal" },
  { name: "n8n", icon: "branch" },
  { name: "LLM Integrations", icon: "cpu" },
  { name: "Web Scraping", icon: "globe" },
  { name: "PostgreSQL", icon: "database" },
  { name: "Tailwind CSS", icon: "layout" },
  { name: "Git", icon: "branch" },
  { name: "Docker", icon: "package" },
];
