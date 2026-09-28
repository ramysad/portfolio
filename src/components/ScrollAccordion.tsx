"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollAccordionProps {
  ask?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  metrics?: { value: string; label: string }[];
}

export default function ScrollAccordion({
  ask,
  problem,
  solution,
  impact,
  metrics,
}: ScrollAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // NEW: The Logic Lock.
  // useRef holds a mutable value that DOES NOT trigger a re-render when changed.
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // If the user just clicked the accordion, ignore the manual scroll listener!
      if (isClickScrolling.current) return;

      const threshold = window.innerHeight * 0.4;

      for (let i = 3; i >= 0; i--) {
        const el = document.getElementById(`bento-anchor-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (idx: number) => {
    // 1. Lock the scroll listener
    isClickScrolling.current = true;

    // 2. Trigger the Framer Motion UI expansion
    setActiveIndex(idx);

    // 3. THE FIX: Wait 450ms instead of 100ms.
    // Framer Motion takes 400ms to open the accordion. We must let the DOM
    // completely settle into its final height before calculating scroll math.
    setTimeout(() => {
      const targetId = `bento-anchor-${idx}`;
      const target = document.getElementById(targetId);

      if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const currentScroll =
          window.scrollY || document.documentElement.scrollTop;
        const offsetPosition = elementPosition + currentScroll - 120;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // 4. Unlock the listener after the scroll animation finishes
        setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      } else {
        isClickScrolling.current = false;
      }
    }, 450);
  };

  const sections = [
    { title: "The Ask", content: ask },
    { title: "Defining the Problem", content: problem },
    { title: "The Solution", content: solution },
    { title: "Impact & Metrics", content: impact, metrics: metrics },
  ];

  return (
    <div className="flex flex-col w-full mt-4 border-t border-border-subtle divide-y divide-border-subtle">
      {sections.map((section, idx) => {
        if (!section.content && !section.metrics) return null;
        const isActive = activeIndex === idx;

        return (
          <div
            key={idx}
            onClick={() => handleSectionClick(idx)}
            className="flex flex-col w-full py-4 transition-colors duration-300 cursor-pointer group"
          >
            <h3
              className={`text-tiny uppercase tracking-widest font-bold transition-all duration-300 ${
                isActive
                  ? "text-content-primary"
                  : "text-content-secondary group-hover:text-content-primary/70"
              }`}
            >
              {section.title}
            </h3>

            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="pt-3 flex flex-col gap-4 cursor-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* 1. THE DESCRIPTION FIX: Changed text-small to text-base */}
                    {section.content && (
                      <p className="text-base text-content-primary leading-relaxed">
                        {section.content}
                      </p>
                    )}

                    {/* 2. THE METRICS (Already fixed previously, keeping for context) */}
                    {section.metrics && (
                      <div className="flex flex-col gap-1 w-full pt-2">
                        {section.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-start gap-1 py-3 w-full border-t border-border-subtle/50 first:border-0"
                          >
                            <span className="text-2xl font-bold text-content-primary tracking-tight">
                              {metric.value}
                            </span>
                            <span className="text-base text-content-secondary leading-snug">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
