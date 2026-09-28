"use client";

import { useEffect } from "react";

export default function ScrollDebugger() {
  useEffect(() => {
    // We run this 500ms after mount to let Next.js finish all its routing quirks
    const timer = setTimeout(() => {
      console.log("--- 🕵️ DEVBRIDGE SCROLL DEBUGGER INITIATED ---");

      // 1. Check the native browser window
      console.log("Window Scroll Y:", window.scrollY);
      console.log("Window Inner Height:", window.innerHeight);
      console.log("Body Scroll Height:", document.body.scrollHeight);

      // 2. Scan every single element on the page to find the rogue scroll container
      const allElements = document.querySelectorAll("*");
      const scrollingElements: Element[] = [];

      allElements.forEach((el) => {
        if (el.scrollTop > 0) {
          scrollingElements.push(el);
          console.log(
            "🔴 FOUND SCROLLING ELEMENT:", 
            el.tagName, 
            el.className, 
            "| ScrollTop:", 
            el.scrollTop
          );
        }
      });

      // 3. Diagnose Flexbox / Overflow collapse
      if (scrollingElements.length === 0 && window.scrollY === 0) {
        console.log("⚠️ WARNING: Nothing is physically scrolled. This means you have a CSS 'overflow: hidden' or Flexbox layout collapse trapping the UI.");
      }

      console.log("-------------------------------------------------");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}