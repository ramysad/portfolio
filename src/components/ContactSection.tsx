"use client";

import { motion } from "framer-motion";
import { Envelope, Phone, LinkedinLogo } from "@phosphor-icons/react";

interface ContactProps {
  dict: {
    headline: string;
    body: string;
  };
}

export default function ContactSection({ dict }: ContactProps) {
  return (
    <section
      id="contact"
      className="w-full h-[100svh] snap-start snap-always px-6 md:px-12 lg:px-24 border-t border-border-subtle flex flex-col justify-center bg-surface-primary"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:pl-32 rtl:md:pr-32 rtl:md:pl-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Constrained to lg:col-span-6 (50% of the 12-column grid) */}
          <div className="md:col-span-12 lg:col-span-6 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-h3 md:text-h2 text-content-primary font-bold tracking-tight">
                {dict.headline}
              </h2>
              <p className="text-h6 text-content-secondary leading-relaxed">
                {dict.body}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-6 pt-2">
              {/* THE FIX: Updated href and span text to the new custom domain email */}
              <a
                href="mailto:hello@ramysader.com"
                className="flex items-center gap-4 group w-fit"
              >
                <Envelope
                  weight="light"
                  className="w-8 h-8 text-content-secondary group-hover:text-content-primary transition-colors"
                />
                <span className="text-body font-medium text-content-secondary group-hover:text-content-primary transition-colors">
                  hello@ramysader.com
                </span>
              </a>

              <a
                href="tel:+971585057319"
                className="flex items-center gap-4 group w-fit"
              >
                <Phone
                  weight="light"
                  className="w-8 h-8 text-content-secondary group-hover:text-content-primary transition-colors"
                />
                <span className="text-body font-medium text-content-secondary group-hover:text-content-primary transition-colors">
                  +971 58 5057319
                </span>
              </a>

              <a
                href="https://linkedin.com/in/ramysader"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group w-fit"
              >
                <LinkedinLogo
                  weight="light"
                  className="w-8 h-8 text-content-secondary group-hover:text-content-primary transition-colors"
                />
                <span className="text-body font-medium text-content-secondary group-hover:text-content-primary transition-colors">
                  linkedin.com/in/ramysader
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}