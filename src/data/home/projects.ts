export interface Project {
  title: string;
  url: string;
  href: string;
  category: string;
  dotColor: string;
  image: string;
}

export const projects: Project[] = [
  { title: "I-Scent", url: "iscent.my", href: "https://www.iscent.my/", category: "E-Commerce · WooCommerce", dotColor: "rgb(214,69,69)", image: "/projects/iscent.webp" },
  { title: "Atlas Advisorse", url: "atlasadvisorse.com", href: "https://atlasadvisorse.com/", category: "Business & Advisory", dotColor: "rgb(37,64,245)", image: "/projects/atlas.webp" },
  { title: "Dental Scotland", url: "dentalscotland.com", href: "https://dentalscotland.com/", category: "Healthcare · Dental", dotColor: "rgb(47,155,214)", image: "/projects/dental.webp" },
  { title: "IA Remodeling", url: "iaremodelings.com", href: "https://www.iaremodelings.com/", category: "Home Services · AI Assistant", dotColor: "rgb(63,181,106)", image: "/projects/iarem.webp" },
  { title: "ASIS Manpower", url: "asismanpower.com", href: "https://www.asismanpower.com/", category: "Recruitment · Business", dotColor: "rgb(240,122,30)", image: "/projects/asis.webp" },
  { title: "Simalaya", url: "simalaya.net", href: "https://simalaya.net/", category: "Enterprise · Consulting", dotColor: "rgb(192,57,43)", image: "/projects/simalaya.webp" },
  { title: "Grommet's Leathercraft", url: "grommetsleathercraft.com", href: "https://grommetsleathercraft.com/", category: "E-Commerce · Handcrafted", dotColor: "rgb(122,82,48)", image: "/projects/grommets.webp" },
  { title: "Flow Living", url: "flowliving.mx", href: "http://flowliving.mx/", category: "Lifestyle · Wellness", dotColor: "rgb(108,79,209)", image: "/projects/flow.webp" },
  { title: "Prime Care Associate", url: "primecareassociate.com", href: "https://primecareassociate.com/", category: "Healthcare · Services", dotColor: "rgb(31,157,85)", image: "/projects/prime.webp" },
];
