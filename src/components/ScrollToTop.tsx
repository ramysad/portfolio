"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    const forceScrollToTop = () => {
      // 1. Scroll the native browser window
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // 2. THE FIX: Physically scroll your custom smooth-scroll wrapper if it exists
      const wrapper = document.querySelector(".scroll-smooth");
      if (wrapper) {
        wrapper.scrollTop = 0;
      }
    };

    // Fire immediately on mount
    forceScrollToTop();
    
    // Fire again 50ms later to override the Next.js router's delayed scroll memory
    const timer = setTimeout(forceScrollToTop, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}