"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import ProjectLockup from "./ProjectLockup";

interface WorkProps {
  lang: string;
  dict: {
    id: string;
    slug?: string;
    client: string;
    tags: string[];
    image: string;
    expanded?: {
      clientLogo?: string;
      layout: any[];
    };
  }[];
}

const maskVariants = {
  enter: (dir: number) => ({ y: dir > 0 ? 80 : -80 }),
  center: { y: 0 },
  exit: (dir: number) => ({ y: dir > 0 ? -80 : 80 }),
};

const RollingDigit = ({
  digit,
  direction,
}: {
  digit: string;
  direction: number;
}) => (
  <span className="relative overflow-hidden inline-flex items-center justify-center w-[0.65em] -mr-[0.05em] last:mr-0">
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

export default function WorkSection({ dict, lang }: WorkProps) {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isTransitioning) return;
    const numProjects = dict.length;
    const index = Math.min(Math.floor(latest * numProjects), numProjects - 1);

    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    }
  });

  const handleProjectClick = (slug?: string) => {
    if (!slug) return;

    // Capture the exact vertical scroll depth right before the curtain wipes
    sessionStorage.setItem("portfolio-scroll", window.scrollY.toString());

    setIsTransitioning(true);
    setTimeout(() => {
      router.push(`/${lang}/work/${slug}`);
    }, 600);
  };

  // THE FIX: Placed inside the component scope so it can access dict, activeIndex, and handleProjectClick
  const handleZoneClick = (e: React.MouseEvent) => {
    // Mobile fallback: Just open the project
    if (window.matchMedia("(pointer: coarse)").matches) {
      handleProjectClick(dict[activeIndex].slug);
      return;
    }

    const { clientY } = e;
    const windowHeight = window.innerHeight;

    if (clientY < 200 && activeIndex > 0) {
      // Top 200px: Programmatically scroll up one viewport height
      window.scrollBy({ top: -windowHeight, behavior: "smooth" });
    } else if (clientY > windowHeight - 200 && activeIndex < dict.length - 1) {
      // Bottom 200px: Programmatically scroll down one viewport height
      window.scrollBy({ top: windowHeight, behavior: "smooth" });
    } else {
      // Middle Zone: Fire the page transition
      handleProjectClick(dict[activeIndex].slug);
    }
  };

  if (!dict?.length) return null;

  return (
    <section
      id="work"
      ref={targetRef}
      className="relative w-full bg-surface-primary"
      // THE FIX 1: Upgraded inline height from vh to dvh
      style={{ height: `${dict.length * 100}dvh` }}
    >
      {/* THE FIX 2: Upgraded sticky container from 100svh to 100dvh */}
      <div className="sticky top-0 h-[100dvh] w-full z-20 pointer-events-none flex items-center overflow-hidden">
        {/* Layer 2.1: Background Blur */}
        <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 w-full md:w-[70%] lg:w-[50%] bg-surface-primary/80 backdrop-blur-xl transition-colors duration-300 [mask-image:linear-gradient(to_right,black_0%,black_25%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_25%,transparent_100%)] rtl:[mask-image:linear-gradient(to_left,black_0%,black_25%,transparent_100%)] rtl:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_25%,transparent_100%)]" />

        {/* Layer 2.2: The Wipe Curtain */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="absolute inset-0 z-40 bg-surface-primary pointer-events-none"
              initial={{ x: lang === "ar" ? "100%" : "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>

        {/* Layer 2.3: Typography Overlay */}
        <div className="relative z-50 w-full px-6 md:px-12 lg:px-24 h-full pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 relative w-full h-full">
            <aside className="lg:col-span-5 flex flex-col pt-[25svh] h-full relative">
              <ProjectLockup
                id={dict[activeIndex].id}
                client={dict[activeIndex].client}
                clientLogo={dict[activeIndex].expanded?.clientLogo}
                tags={dict[activeIndex].tags}
                direction={direction}
                onClick={() => handleProjectClick(dict[activeIndex].slug)}
                previousProjects={dict.slice(0, activeIndex).reverse()}
                nextProjects={dict.slice(activeIndex + 1)}
                isInteractive={true}
              />
            </aside>
          </div>
        </div>
      </div>

      {/* Layer 1: Standard Document Flow Images */}
      <div
        className="relative z-10 w-full flex flex-col -mt-[100dvh]"
        data-cursor-zone="work"
        data-active-index={activeIndex}
        data-total={dict.length}
        onClick={handleZoneClick}
      >
        {dict.map((project, index) => (
          <div
            key={project.id}
            // THE FIX: Injected the dynamic ID so the nav anchor has a physical target
            id={`project-${index + 1}`} 
            className="h-[100dvh] w-full relative overflow-hidden snap-start snap-always shrink-0"
          >
            <div 
              className="md:hidden absolute inset-0 z-50 w-full h-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleProjectClick(project.slug);
              }}
            />
            <Image
              src={project.image}
              alt={project.client}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
