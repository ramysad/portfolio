"use client";

import { useEffect } from "react";

export default function HomepageSnapper() {
  useEffect(() => {
    // 1. When the homepage mounts, inject Tailwind's snap classes into the global HTML tag
    document.documentElement.classList.add("snap-y", "snap-mandatory");

    // 2. CLEANUP: The millisecond the user navigates away (e.g., to a case study),
    // strip the snap classes away so it doesn't cause the scroll-trap bug on the Password Gate!
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  return null;
}