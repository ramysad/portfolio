"use client";

import React from "react";
import Tag from "@/components/Tag";

interface AboutProps {
  dict: {
    title: string;
    subtitle: string;
    paragraph: string;
    competencies: {
      title: string;
      subtitle: string;
      stages: { name: string; tags: string[] }[];
    };
  };
}

export default function AboutSection({ dict }: AboutProps) {
  return (
    <section id="about" className="w-full relative z-20 px-6 md:px-12 lg:px-24 py-24 lg:py-32 border-t border-border-subtle/50 snap-start bg-surface-primary">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-24 lg:gap-32 md:pl-32 rtl:md:pr-32 rtl:md:pl-0">
        
        {/* TOP INTRO BLOCK (Constrained to ~60% width on large screens) */}
        <div className="flex flex-col gap-12 lg:max-w-5xl">
          <h2 className="text-h3 md:text-h2 text-content-primary font-bold tracking-tight">
            {dict.title}
          </h2>
          
          {/* Editorial 2-Column Split for Subtitle and Paragraph */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <p className="text-h4 text-content-primary leading-snug">
              {dict.subtitle}
            </p>
            <p className="text-body text-content-secondary leading-relaxed">
              {dict.paragraph}
            </p>
          </div>
        </div>

        {/* CORE COMPETENCIES BLOCK */}
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h3 className="text-tiny uppercase tracking-widest font-bold text-content-secondary">
              {dict.competencies.title}
            </h3>
            <p className="text-h4 text-content-primary leading-tight">
              {dict.competencies.subtitle}
            </p>
          </div>

          {/* DESIGN THINKING LOOP: 5-Column Kanban-style layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12 border-t border-border-subtle/50 pt-12">
            {dict.competencies.stages.map((stage, index) => {
              // Dynamically generate the padded number (01, 02, etc.)
              const stepNumber = String(index + 1).padStart(2, "0");
              
              return (
                <div key={index} className="flex flex-col gap-6">
                  {/* Category Header with "01" Prefix */}
                  <div className="flex flex-col gap-2 pb-4 border-b border-border-subtle/50">
                    <span className="text-small font-light text-content-secondary/60 font-sans tracking-widest">
                      {stepNumber}
                    </span>
                    <h4 className="text-small font-bold text-content-primary uppercase tracking-wide">
                      {stage.name}
                    </h4>
                  </div>

                  {/* Vertically stacked tags that natively flex-wrap when running out of horizontal space */}
                  <div className="flex flex-row flex-wrap gap-3">
                    {stage.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex} label={tag} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}