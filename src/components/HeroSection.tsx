"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

export interface HeroProps {
  dict: {
    greeting: string;
    intro: string;
    roles: string[];
    labels: { title: string; year: string };
    stats: { projects: string; experience: string };
    scroll: string;
  };
}

export default function HeroSection({ dict }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dict.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [dict.roles.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const xOffset = useTransform(smoothX, [-800, 800], [150, -150]);
  const yOffset = useTransform(smoothY, [-800, 800], [150, -150]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full h-[100svh] snap-start snap-always md:h-screen min-h-[600px] overflow-hidden bg-surface-primary border-b border-border-subtle transition-colors duration-300"
    >
      <div className="flex h-full w-full md:px-12 lg:px-24 relative">
        
        {/* LEFT COLUMN: 42px Side Labels */}
        <div className="hidden md:flex w-[42px] h-full flex-col py-24 items-center justify-center relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="-rotate-180 [writing-mode:vertical-rl] text-tiny uppercase tracking-widest text-content-secondary whitespace-nowrap mt-4"
          >
            {dict.labels.title}
          </motion.span>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
            className="w-[1px] flex-1 bg-border-strong my-8 opacity-50 origin-bottom"
          ></motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="-rotate-180 [writing-mode:vertical-rl] text-tiny text-content-secondary whitespace-nowrap mb-4"
          >
            {dict.labels.year}
          </motion.span>
        </div>

        {/* CENTER COLUMN: Text Block */}
        {/* THE FIX: Added padding (md:ltr:pl-16 lg:ltr:pl-24 and RTL equivalents) to create beautiful negative space from the timeline. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="absolute top-0 ltr:left-0 rtl:right-0 w-full h-[25%] px-6 pt-16 md:pt-24 flex flex-col justify-start z-20 md:relative md:flex-1 md:h-full md:w-auto md:px-0 md:pt-0 md:justify-center md:-mt-12 md:ltr:pl-16 lg:ltr:pl-24 md:rtl:pr-16 lg:rtl:pr-24 pointer-events-none"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[8rem] rtl:text-[6.5rem] md:text-[10rem] lg:text-[12rem] ltr:leading-[0.85] rtl:leading-[1.2] md:ltr:leading-none md:rtl:leading-[1.1] font-sans font-light tracking-tighter text-content-primary -mx-1 md:-mx-2"
          >
            {dict.greeting}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-small md:text-h6 text-content-secondary mt-2 md:mt-4 flex flex-wrap items-center gap-2"
          >
            &mdash; {dict.intro}
            <span className="relative inline-grid whitespace-nowrap">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                  style={{ transformOrigin: "50% 50%" }}
                  className="col-start-1 row-start-1 font-medium text-content-primary"
                >
                  {dict.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hidden md:flex gap-16 lg:gap-24 mt-16 lg:mt-24 pointer-events-auto"
          >
            <div className="flex flex-col">
              <span className="text-h2 font-light text-content-primary">
                +200
              </span>
              <span className="text-tiny text-content-secondary">
                {dict.stats.projects}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-h2 font-light text-content-primary">
                +15
              </span>
              <span className="text-tiny text-content-secondary">
                {dict.stats.experience}
              </span>
            </div>
          </motion.div>

          {/* THE FIX: Re-anchored to the absolute bottom of the parent container, and synchronized the left/right offsets to match the container's padding. */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-12 ltr:left-16 lg:ltr:left-24 rtl:right-16 lg:rtl:right-24 hidden md:flex items-center gap-2 pointer-events-auto"
          >
            <span className="text-small text-content-primary">
              {dict.scroll} &darr;
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Counterweight */}
        <div className="hidden md:block w-[42px] flex-shrink-0" />

        {/* Image Block */}
        <div className="absolute bottom-0 ltr:left-0 rtl:right-0 w-full h-[75%] md:w-[75%] md:h-[90%] md:ltr:left-auto md:rtl:right-auto md:ltr:-right-10 md:rtl:-left-10 z-10 pointer-events-none">
          
          {/* THE FIX: Removed the global "opacity-20" class. 
              We now rely strictly on the color alpha channels (bg-neutral-400/30 and bg-white/10) 
              so the math doesn't multiply into invisibility. */}
          <motion.div
            style={{ x: xOffset, y: yOffset }}
            className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-neutral-400/50 dark:bg-white/10 blur-[100px] -z-10 transition-colors duration-300"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
              delay: 0.4,
            }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/hero_image_light.webp"
              alt="Ramy Sader Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover object-top md:object-contain md:object-bottom dark:hidden z-10"
              priority
            />
            <Image
              src="/images/hero_image_dark.webp"
              alt="Ramy Sader Portrait Dark"
              fill
              sizes="(max-width: 768px) 100vw, 75vw"
              className="hidden dark:block object-cover object-top md:object-contain md:object-bottom z-10"
              priority
            />
          </motion.div>
        </div>

        {/* Mobile Stats & Scroll Overlay */}
        <div className="absolute bottom-8 ltr:left-6 rtl:right-6 md:hidden z-30 flex flex-col gap-6 pointer-events-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex gap-8"
          >
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-h3 font-light text-content-primary drop-shadow-md">
                +200
              </span>
              <span className="text-tiny text-content-secondary drop-shadow-sm">
                {dict.stats.projects}
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col">
              <span className="text-h3 font-light text-content-primary drop-shadow-md">
                +15
              </span>
              <span className="text-tiny text-content-secondary drop-shadow-sm">
                {dict.stats.experience}
              </span>
            </motion.div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-small font-medium text-content-primary flex items-center gap-2 drop-shadow-sm"
          >
            {dict.scroll} &darr;
          </motion.span>
        </div>
      </div>
    </section>
  );
}