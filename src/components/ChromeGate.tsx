"use client";

import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

/**
 * The home page ships its own cursor and theme toggle (new design), so the
 * legacy floating chrome is only rendered on the other routes.
 */
export function ChromeGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <>
      <CustomCursor />
      <ThemeSwitcher />
    </>
  );
}
