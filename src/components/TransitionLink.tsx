"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  lang: string;
}

export default function TransitionLink({
  href,
  children,
  className,
  lang,
}: TransitionLinkProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isRTL = lang === "ar";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsTransitioning(true);

    // Hold the routing until the black curtain finishes sweeping in (600ms)
    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      {/* The Exit Wipe: Sweeps in to cover the screen before routing */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black pointer-events-none"
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
