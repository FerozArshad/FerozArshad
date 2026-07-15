export type Lang = "en" | "es";

export const dict = {
  en: {
    nav: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    greeting: "Hi 👋 my name is",
    about: "About",
    services: "Services",
    experience: "Experience & background",
    projects: "Featured projects",
    reviews: "Client reviews",
    viewAllProjects: "View all projects",
    contactTitle: "Have a project in mind? Let's build it.",
  },
  es: {
    nav: [
      { label: "Sobre mí", href: "#about" },
      { label: "Servicios", href: "#services" },
      { label: "Experiencia", href: "#experience" },
      { label: "Proyectos", href: "#projects" },
      { label: "Reseñas", href: "#reviews" },
      { label: "Contacto", href: "#contact" },
    ],
    greeting: "Hola 👋 mi nombre es",
    about: "Sobre mí",
    services: "Servicios",
    experience: "Trayectoria y formación",
    projects: "Proyectos destacados",
    reviews: "Reseñas de clientes",
    viewAllProjects: "Ver todos los proyectos",
    contactTitle: "¿Tienes un proyecto en mente? Construyámoslo.",
  },
} as const;

export const FIVERR_URL = "https://www.fiverr.com/ferozarshad";
export const UPWORK_URL = "https://www.upwork.com/freelancers/~0102de529de797e624";
export const WHATSAPP_URL = "https://wa.me/13463903356";
export const EMAIL = "info@ferozarshad.com";
