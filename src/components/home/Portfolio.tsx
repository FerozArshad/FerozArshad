"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { Lang } from "@/lib/home-i18n";
import Nav from "./Nav";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Experience from "./Experience";
import Projects from "./Projects";
import Reviews from "./Reviews";
import Contact from "./Contact";
import Footer from "./Footer";
import LeadModal from "./LeadModal";
import MatrixBackground from "./MatrixBackground";
import CustomCursor from "./CustomCursor";
import FloatingWhatsApp from "./FloatingWhatsApp";

export default function Portfolio() {
  const [lang, setLangState] = useState<Lang>("en");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("feroz-lang");
    if (saved === "es") setLangState("es");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("feroz-lang", l);
    } catch {}
  };

  // Theme is shared with the rest of the site via next-themes (class attribute).
  const isDark = !mounted || resolvedTheme !== "light";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const openLead = () => setLeadOpen(true);

  return (
    <div className="fz">
      <MatrixBackground />
      <CustomCursor />
      <Nav lang={lang} setLang={setLang} isDark={isDark} toggleTheme={toggleTheme} />
      <Hero lang={lang} openLead={openLead} />
      <div
        className="main-col"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 110,
        }}
      >
        <About lang={lang} />
        <Services lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Reviews lang={lang} />
        <Contact lang={lang} openLead={openLead} />
      </div>
      <Footer />
      {leadOpen && <LeadModal close={() => setLeadOpen(false)} />}
      <FloatingWhatsApp />
    </div>
  );
}
