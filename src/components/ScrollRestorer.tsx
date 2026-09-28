"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer() {
  const pathname = usePathname(); // e.g., "/en", "/en/work/project-1"

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("portfolio-scroll");

    // 1. Identify if the current route is a root homepage
    const isHomepage = 
      pathname === "/" || 
      pathname === "/en" || 
      pathname === "/fr" || 
      pathname === "/ar";

    // 2. THE FIX: If we have a saved scroll but we are entering a Case Study, 
    // abort the restoration and wipe the memory so it doesn't trap the user.
    if (savedScroll && !isHomepage) {
      sessionStorage.removeItem("portfolio-scroll");
      return; 
    }

    // 3. Normal behavior: Only restore if we are actually on the homepage
    if (savedScroll && isHomepage) {
      const wrapper = document.querySelector(".scroll-smooth");
      if (wrapper) wrapper.classList.remove("scroll-smooth");

      window.scrollTo({
        top: parseInt(savedScroll, 10),
        left: 0,
        behavior: "instant", 
      });

      sessionStorage.removeItem("portfolio-scroll");

      requestAnimationFrame(() => {
        if (wrapper) wrapper.classList.add("scroll-smooth");
      });
    }
  }, [pathname]);

  return null;
}