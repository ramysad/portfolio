"use client";

import { useEffect, useRef, useState } from "react";

export default function StickySidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  // Default to 160px (top-40) for the initial server render so it doesn't jump
  const [topOffset, setTopOffset] = useState("160px");

  useEffect(() => {
    const calculateOffset = () => {
      if (sidebarRef.current) {
        const elementHeight = sidebarRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // The Magic Formula:
        // 160px = top-40 limit. 48px = 3rem bottom margin lock.
        // If the sidebar is taller than the screen, this creates a negative top offset.
        // It allows the column to scroll up naturally, but halts EXACTLY when the bottom hits 48px.
        const offset = Math.min(160, windowHeight - elementHeight - 48);
        setTopOffset(`${offset}px`);
      }
    };

    // Calculate on mount and window resize
    calculateOffset();
    window.addEventListener("resize", calculateOffset);

    // Pro-move: Re-calculate if fonts load or text wraps, altering the height
    const observer = new ResizeObserver(calculateOffset);
    if (sidebarRef.current) observer.observe(sidebarRef.current);

    return () => {
      window.removeEventListener("resize", calculateOffset);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      // UPDATE: Changed duration-75 to duration-500, and replaced ease-out with a smooth ease-in-out.
      // We specifically target transition-[top] so it only animates the Y-axis shift smoothly.
      className="sticky w-full transition-[top] duration-500 ease-in-out"
      style={{ top: topOffset }}
    >
      <div className="flex flex-col gap-10 pb-12 w-full">{children}</div>
    </div>
  );
}
