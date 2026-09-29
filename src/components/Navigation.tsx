"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Globe, CaretDown, List, X, ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface NavigationProps {
  lang: string;
  dict: {
    about: string;
    work: string;
    clients: string;
    contact: string;
    getInTouch: string;
    projects: string[];
  };
}

export default function Navigation({ lang, dict }: NavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest <= 50) {
      setIsTop(true);
    } else {
      setIsTop(false);
      if (latest > previous) setIsLangOpen(false);
    }
  });

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isTop && !isMobileMenuOpen
          ? "bg-transparent border-transparent"
          : "bg-surface-primary/80 backdrop-blur-xl border-b border-border-subtle shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 w-full px-6 md:px-12 lg:px-24 items-center justify-between">
        
        <Link 
          href={`/${lang}`} 
          onClick={(e) => {
            const currentPath = window.location.pathname;
            if (currentPath === `/${lang}` || currentPath === `/${lang}/`) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative flex items-center h-[30px] md:h-[36px] w-[210px] md:w-[240px]"
        >
          <Image 
            src="/images/logo-ramysader.svg" 
            alt="Ramy Sader Logo" 
            fill 
            priority
            className="object-contain object-left invert dark:invert-0" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 mr-4">
            <a
              href="#about"
              className="text-small text-content-secondary hover:text-content-primary transition-colors"
            >
              {dict.about}
            </a>
            <a
              href="#work"
              className="text-small text-content-secondary hover:text-content-primary transition-colors"
            >
              {dict.work}
            </a>
            <a
              href="#clients"
              className="text-small text-content-secondary hover:text-content-primary transition-colors"
            >
              {dict.clients}
            </a>
          </nav>

          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-surface-secondary transition-colors text-content-primary"
            >
              <Globe size={20} weight="light" />
              <CaretDown
                size={14}
                weight="light"
                className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-surface-primary border border-border-subtle rounded-lg shadow-xl overflow-hidden flex flex-col"
                >
                  <Link
                    href="/en"
                    onClick={() => setIsLangOpen(false)}
                    className="px-4 py-2 text-small text-content-secondary hover:text-content-primary hover:bg-surface-secondary transition-colors"
                  >
                    English
                  </Link>
                  <Link
                    href="/ar"
                    onClick={() => setIsLangOpen(false)}
                    className="px-4 py-2 text-small text-content-secondary hover:text-content-primary hover:bg-surface-secondary transition-colors"
                  >
                    العربية
                  </Link>
                  <Link
                    href="/fr"
                    onClick={() => setIsLangOpen(false)}
                    className="px-4 py-2 text-small text-content-secondary hover:text-content-primary hover:bg-surface-secondary transition-colors"
                  >
                    Français
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-surface-secondary transition-colors text-content-primary"
            >
              {theme === "dark" ? (
                <Sun size={20} weight="light" />
              ) : (
                <Moon size={20} weight="light" />
              )}
            </button>
          )}

          <a
            href="#contact"
            className="group flex items-center gap-2 px-5 py-2 border border-content-primary text-small text-content-primary hover:bg-content-primary hover:text-surface-primary transition-colors"
          >
            <span>{dict.getInTouch}</span>
            <ArrowUpRight 
              size={14} 
              weight="bold" 
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </a>
        </div>

        {/* Mobile Right Controls: CTA + Burger */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex items-center gap-1.5 px-5 py-2.5 border border-content-primary text-small font-medium text-content-primary hover:bg-content-primary hover:text-surface-primary transition-colors whitespace-nowrap"
          >
            <span>{dict.getInTouch}</span>
            <ArrowUpRight 
              size={14} 
              weight="bold" 
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-content-primary relative"
          >
            {isMobileMenuOpen ? (
              <X size={24} weight="light" />
            ) : (
              <List size={24} weight="light" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Takeover Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 z-40 bg-surface-primary flex flex-col px-6 pt-24 pb-12 h-[100dvh] overflow-y-auto"
          >
            <nav className="flex flex-col gap-8 flex-1">
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-h4 font-light text-content-primary hover:opacity-70 transition-opacity"
              >
                {dict.about}
              </a>

              {/* Portfolio Accordion */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsWorkOpen(!isWorkOpen)}
                  className="flex items-center justify-between text-h4 font-light text-content-primary hover:opacity-70 transition-opacity text-left w-full"
                >
                  {dict.work}
                  <CaretDown
                    size={24}
                    weight="light"
                    className={`transition-transform ${isWorkOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isWorkOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex flex-col gap-4 pl-6 border-l-2 border-border-strong overflow-hidden ml-2 mt-2"
                    >
                      {dict.projects.map((project, index) => (
                        <Link
                          key={index}
                          href={`/${lang}#project-${index + 1}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-small text-content-secondary hover:text-content-primary pt-2 block"
                        >
                          {project}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#clients"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-h4 font-light text-content-primary hover:opacity-70 transition-opacity"
              >
                {dict.clients}
              </a>
            </nav>

            {/* THE FIX: Restored the missing parent flex container here */}
            {/* Bottom Controls */}
            <div className="mt-auto pt-8 border-t border-border-subtle flex justify-between items-center">
              <div className="flex gap-6">
                <Link
                  href="/en"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-h6 transition-all ${lang === "en" ? "text-content-primary underline underline-offset-[8px] decoration-1" : "text-content-secondary hover:text-content-primary"}`}
                >
                  EN
                </Link>
                <Link
                  href="/ar"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-h6 transition-all ${lang === "ar" ? "text-content-primary underline underline-offset-[8px] decoration-1" : "text-content-secondary hover:text-content-primary"}`}
                >
                  AR
                </Link>
                <Link
                  href="/fr"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-h6 transition-all ${lang === "fr" ? "text-content-primary underline underline-offset-[8px] decoration-1" : "text-content-secondary hover:text-content-primary"}`}
                >
                  FR
                </Link>
              </div>

              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-3 rounded-full hover:bg-surface-secondary text-content-primary"
                >
                  {theme === "dark" ? (
                    <Sun size={28} weight="light" />
                  ) : (
                    <Moon size={28} weight="light" />
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}