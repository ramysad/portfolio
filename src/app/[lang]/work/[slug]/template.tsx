"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";

export default function ProjectTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const isRTL = params?.lang === "ar";

  return (
    <>
      <motion.div
        // CHANGED: Demoted from z-[100] to z-40.
        // This slides perfectly between the Lockup (z-50) and the background grid (z-auto).
        className="fixed inset-0 z-40 bg-black pointer-events-none"
        initial={{ x: "0%" }}
        animate={{ x: isRTL ? "-100%" : "100%" }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      />
      {children}
    </>
  );
}
