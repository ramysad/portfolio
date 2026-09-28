"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { X } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

interface ProjectSubNavProps {
  id: string;
  client: string;
  lang: string;
}

export default function ProjectSubNav({
  id,
  client,
  lang,
}: ProjectSubNavProps) {
  // 1. Initialize scroll tracking
  const { scrollY } = useScroll();
  const [isTop, setIsTop] = useState(true);

  // 2. Sync the threshold perfectly with Navigation.tsx (50px)
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsTop(latest <= 50);
  });

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1], delay: 0.6 }}
      className={`fixed top-16 inset-x-0 z-[100] h-14 flex items-center justify-between px-6 md:px-12 lg:px-24 transition-colors duration-300 ${
        isTop
          ? "bg-transparent border-transparent"
          : "bg-surface-primary/80 backdrop-blur-xl border-b border-border-subtle"
      }`}
    >
      <div className="flex items-center gap-6">
        <span
          className={`font-bold tabular-nums transition-colors duration-300 ${isTop ? "text-content-primary" : "text-content-primary"}`}
        >
          {id}
        </span>
        <span
          className={`text-small font-medium line-clamp-1 transition-colors duration-300 ${isTop ? "text-content-primary" : "text-content-secondary"}`}
        >
          {client}
        </span>
      </div>

      <Link
        href={`/${lang}`}
        className="p-2 -mr-2 rounded-full hover:bg-surface-secondary text-content-primary transition-colors flex items-center gap-2 group"
      >
        <span className="text-tiny font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
          Close
        </span>
        <X size={20} weight="bold" />
      </Link>
    </motion.div>
  );
}
