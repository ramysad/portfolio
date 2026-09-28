"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const maskVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 80 : -80 }),
  center: { y: 0 },
  exit: (dir: number) => ({ y: dir > 0 ? -80 : 80 }),
};

// 1. We brought the RollingDigit directly into the Master Component
const RollingDigit = ({
  digit,
  direction,
}: {
  digit: string;
  direction: number;
}) => (
  <span className="relative overflow-hidden inline-flex items-center justify-center w-[0.65em] -mr-[0.08em] last:mr-0">
    <AnimatePresence custom={direction} mode="popLayout" initial={false}>
      <motion.span
        key={digit}
        custom={direction}
        variants={{
          enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%" }),
          center: { y: "0%" },
          exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%" }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
        className="block"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
);

// 2. Component Properties (Props)
interface ProjectLockupProps {
  id: string;
  client: string;
  clientLogo?: string;
  agency?: string;
  role?: string;
  tags: string[];
  direction?: number;
  onClick?: () => void;
  previousProjects?: { id: string }[];
  nextProjects?: { id: string }[];
  isInteractive?: boolean;
  children?: React.ReactNode;
}

export default function ProjectLockup({
  id,
  client,
  clientLogo,
  agency,
  role,
  tags,
  direction = 1,
  onClick,
  previousProjects = [],
  nextProjects = [],
  isInteractive = false,
  children,
}: ProjectLockupProps) {
  return (
    <div className="md:ml-16 rtl:md:mr-16 rtl:md:ml-0 flex flex-col items-start w-full max-w-sm pointer-events-auto relative z-50">
      {/* GIANT NUMBER & SPACERS */}
      <div className="flex flex-col justify-end w-full h-[220px] md:h-[280px] pb-4">
        <div
          className={`flex flex-col-reverse items-start mb-6 shrink-0 gap-2 ${!isInteractive ? "opacity-0" : ""}`}
        >
          <AnimatePresence initial={false}>
            {isInteractive ? (
              previousProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 28, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <span
                    dir="ltr"
                    className="text-small font-medium text-content-secondary block h-[28px] flex items-center w-fit"
                  >
                    {project.id}
                  </span>
                </motion.div>
              ))
            ) : (
              // Static spacer to ensure the Case Study page margins match perfectly
              <span className="h-[28px] block">00</span>
            )}
          </AnimatePresence>
        </div>

        <div
          dir="ltr"
          className="flex w-fit text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.85] font-sans font-bold tracking-tighter text-content-primary"
        >
          {isInteractive
            ? id
                .split("")
                .map((char, i) => (
                  <RollingDigit
                    key={`digit-${i}`}
                    digit={char}
                    direction={direction}
                  />
                ))
            : id.split("").map((char, i) => (
                <span
                  key={`static-digit-${i}`}
                  className="relative overflow-hidden inline-flex items-center justify-center w-[0.65em] -mr-[0.08em] last:mr-0"
                >
                  <span className="block">{char}</span>
                </span>
              ))}
        </div>
      </div>

      {/* THE ANIMATED LINE */}
      <div className="w-full h-[2px] bg-content-primary shrink-0 z-10 overflow-hidden relative">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={isInteractive ? id : "static-line"}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
              center: { x: "0%" },
              exit: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
            }}
            initial={isInteractive ? "enter" : "center"}
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-0 bg-content-primary"
          />
        </AnimatePresence>
      </div>

      {/* CLIENT TITLE OR LOGO (Dynamically hugging contents) */}
      <motion.div
        layout
        // FIX 1: Set top padding to pt-8 (32px) and removed pb entirely to prevent compounding
        className="overflow-hidden relative w-full pt-8 pointer-events-auto"
      >
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={isInteractive ? id : "static-title"}
            custom={direction}
            variants={maskVariants}
            initial={isInteractive ? "enter" : "center"}
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="flex flex-col items-start w-full"
          >
            {isInteractive && onClick ? (
              <button
                onClick={onClick}
                className="group cursor-pointer text-left w-full"
              >
                {clientLogo ? (
                  <div className="relative w-64 h-12 md:w-72 md:h-14 group-hover:opacity-70 transition-opacity">
                    <Image
                      src={clientLogo}
                      alt={`${client} Logo`}
                      fill
                      // THE FIX: Added 'invert dark:invert-0' and a smooth filter transition
                      className="object-contain object-left invert dark:invert-0 transition-[filter] duration-300"
                    />
                    <span className="sr-only">{client}</span>
                  </div>
                ) : (
                  <h3 className="text-h6 font-bold text-content-primary leading-tight line-clamp-2 group-hover:opacity-70 transition-opacity">
                    {client}
                  </h3>
                )}
              </button>
            ) : clientLogo ? (
              <div className="relative w-64 h-12 md:w-72 md:h-14">
                <Image
                  src={clientLogo}
                  alt={`${client} Logo`}
                  fill
                  // THE FIX: Added 'invert dark:invert-0' to the static version as well
                  className="object-contain object-left invert dark:invert-0 transition-[filter] duration-300"
                />
                <span className="sr-only">{client}</span>
              </div>
            ) : (
              <h3 className="text-h6 font-bold text-content-primary leading-tight line-clamp-2">
                {client}
              </h3>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* TAGS (Dynamically hugging contents) */}
      <motion.div
        layout
        // FIX 2: Set top margin to mt-8 (32px) to match the Logo's gap exactly
        className="overflow-hidden relative w-full mt-8 pointer-events-auto"
      >
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={isInteractive ? id : "static-tags"}
            custom={direction}
            variants={maskVariants}
            initial={isInteractive ? "enter" : "center"}
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1], delay: 0.05 }}
            className="flex flex-wrap gap-2 w-full"
          >
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full border border-border-strong text-tiny text-content-secondary uppercase tracking-wider backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* UPCOMING PROJECTS SPACER */}
      {isInteractive && (
        <div className="flex flex-col mt-4 pointer-events-auto shrink-0 gap-2">
          <AnimatePresence initial={false}>
            {nextProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 28, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.7, 0, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span
                  dir="ltr"
                  className="text-small font-medium text-content-secondary block h-[28px] flex items-center w-fit"
                >
                  {project.id}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 2. THE NEW METADATA BLOCK: Added directly below the tags */}
      {(agency || role) && (
        <motion.div
          layout
          className="overflow-hidden relative w-full mt-8 pointer-events-auto flex flex-col gap-6"
        >
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            {agency && (
              <motion.div
                key={isInteractive ? `${id}-agency` : "static-agency"}
                custom={direction}
                initial={isInteractive ? "enter" : "center"}
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.7, 0, 0.3, 1],
                  delay: 0.1,
                }}
                className="flex flex-col gap-1 w-full"
              >
                <span className="text-tiny uppercase tracking-widest font-bold text-content-secondary">
                  Agency
                </span>
                <span className="text-base text-content-primary leading-relaxed">
                  {agency}
                </span>
              </motion.div>
            )}
            {role && (
              <motion.div
                key={isInteractive ? `${id}-role` : "static-role"}
                custom={direction}
                initial={isInteractive ? "enter" : "center"}
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: [0.7, 0, 0.3, 1],
                  delay: 0.15,
                }}
                className="flex flex-col gap-1 w-full"
              >
                <span className="text-tiny uppercase tracking-widest font-bold text-content-secondary">
                  My Role
                </span>
                <span className="text-base text-content-primary leading-relaxed">
                  {role}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* EXPANDED CONTENT AREA (THE ASK) */}
      {children && (
        // FIX 3: Set top margin to mt-8 (32px) to match the Tags' gap exactly
        <div className="mt-4 flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both w-full">
          {children}
        </div>
      )}
    </div>
  );
}
