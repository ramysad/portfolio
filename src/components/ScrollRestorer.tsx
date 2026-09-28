"use client";

import { useEffect } from "react";

export default function ScrollRestorer() {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("portfolio-scroll");

    if (savedScroll) {
      // 1. Target the element controlling the smooth scrolling
      const wrapper = document.querySelector(".scroll-smooth");

      // 2. Temporarily strip the CSS smooth-scroll rule
      if (wrapper) wrapper.classList.remove("scroll-smooth");

      // 3. Force an instant, mathematical snap to the exact pixel
      window.scrollTo({
        top: parseInt(savedScroll, 10),
        left: 0,
        behavior: "instant", // or "auto" as a fallback
      });

      // 4. Clear the memory
      sessionStorage.removeItem("portfolio-scroll");

      // 5. Re-enable smooth scrolling after the browser has painted the jump
      requestAnimationFrame(() => {
        if (wrapper) wrapper.classList.add("scroll-smooth");
      });
    }
  }, []);

  return null;
}
