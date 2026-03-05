"use client";

import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const currentTheme = resolvedTheme || theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="fixed bottom-6 right-6 z-[100] p-4 rounded-full bg-foreground/10 backdrop-blur-md border border-foreground/20 shadow-2xl hover:scale-110 hover:bg-foreground/20 transition duration-300 text-foreground flex items-center justify-center"
            aria-label="Toggle Dark Mode"
        >
            {currentTheme === "dark" ? <IconSun className="w-6 h-6" /> : <IconMoon className="w-6 h-6" />}
        </button>
    );
}
