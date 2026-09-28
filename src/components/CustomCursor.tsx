"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

// 1. THE FIX: Define the expected dictionary structure
export interface CursorDict {
  more: string;
  view: string;
  next: string;
  prev: string;
}

export default function CustomCursor({ dict }: { dict?: CursorDict }) {
  // 2. THE FIX: Establish a fallback just in case the dictionary hasn't loaded yet
  const labels = dict || {
    more: "MORE ABOUT THIS",
    view: "VIEW PROJECT",
    next: "NEXT",
    prev: "PREV",
  };

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const { resolvedTheme } = useTheme();

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState({
    active: false,
    text: "",
    variant: "default",
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      const interactive = target.closest("a, button");
      if (interactive) {
        setCursorState({ active: true, text: "", variant: "interactive" });
        return;
      }

      const workZone = target.closest('[data-cursor-zone="work"]');
      if (workZone) {
        const windowHeight = window.innerHeight;
        const activeIndex = parseInt(
          workZone.getAttribute("data-active-index") || "0",
        );
        const total = parseInt(workZone.getAttribute("data-total") || "1");

        // 3. THE FIX: We now use the localized `labels` object instead of hardcoded English
        if (e.clientY < 200 && activeIndex > 0) {
          setCursorState({
            active: true,
            text: labels.prev,
            variant: "project",
          });
        } else if (e.clientY > windowHeight - 200 && activeIndex < total - 1) {
          setCursorState({ active: true, text: labels.next, variant: "project" });
        } else {
          setCursorState({
            active: true,
            text: labels.more,
            variant: "project",
          });
        }
        return;
      }

      setCursorState({ active: false, text: "", variant: "default" });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, labels]); // Added labels to dependency array

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const projectBgColor = isDark
    ? "rgba(0, 0, 0, 0.3)"
    : "rgba(255, 255, 255, 0.3)";
  const projectBorder = isDark
    ? "1px solid rgba(255, 255, 255, 0.15)"
    : "1px solid rgba(0, 0, 0, 0.1)";

  const defaultBorder = isDark
    ? "1px solid rgba(0, 0, 0, 0.4)"
    : "1px solid rgba(255, 255, 255, 0.6)";

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "var(--text-primary)",
      opacity: 0.3,
      backdropFilter: "blur(0px)",
      border: defaultBorder,
    },
    interactive: {
      width: 48,
      height: 48,
      backgroundColor: "var(--text-primary)",
      opacity: 0.1,
      backdropFilter: "blur(4px)",
      border: defaultBorder,
    },
    project: {
      width: 144,
      height: 144,
      backgroundColor: projectBgColor,
      backdropFilter: "blur(12px)",
      border: projectBorder,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <motion.div
        variants={variants}
        animate={cursorState.variant}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="flex items-center justify-center rounded-full shadow-xl overflow-hidden"
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence mode="wait">
          {cursorState.variant === "project" && (
            <motion.div
              key={cursorState.text}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center text-tiny font-bold uppercase tracking-widest text-content-primary text-center leading-tight drop-shadow-md w-full h-full"
            >
              {/* 4. THE FIX: Map the UI icons against the localized labels */}
              {cursorState.text === labels.prev && (
                <ArrowUp size={20} weight="light" className="absolute top-8" />
              )}

              <span className="w-[66%]">{cursorState.text}</span>

              {cursorState.text === labels.next && (
                <ArrowDown
                  size={20}
                  weight="light"
                  className="absolute bottom-8"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}