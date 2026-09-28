"use client";

import Image from "next/image";
import React from "react";
import ProjectSubNav from "@/components/ProjectSubNav";
import ProjectLockup from "@/components/ProjectLockup";
import NextProjectFooter from "@/components/NextProjectFooter";

export interface ProjectData {
  id: string;
  slug?: string;
  client: string;
  tags: string[];
  password?: string;
  protected?: boolean;
  expanded?: {
    agency?: string;
    role?: string;
    about: string;
    clientLogo?: string;
    theAsk?: string;
    theProblem?: string;
    theSolution?: string;
    theImpact?: string;
    metrics?: { value: string; label: string }[];
    layout: {
      type: string;
      anchor?: string;
      block?: any;
      leftCol?: any[];
      midCol?: any[];
      rightCol?: any[];
    }[];
  };
}

const RenderBlock = ({ block }: { block: any }) => {
  if (block.type === "image") {
    const heightClass = block.isCover ? "h-full min-h-[300px] md:min-h-[500px]" : "";
    const containerClasses = block.noBg
      ? `w-full relative overflow-hidden ${heightClass}`
      : `w-full relative bg-surface-secondary overflow-hidden rounded-lg border border-border-subtle ${heightClass}`;

    return (
      <div className={containerClasses}>
        <Image
          src={block.src}
          alt="Case Study Artifact"
          width={0}
          height={0}
          sizes="100vw"
          className={`w-full ${block.isCover ? "h-full object-cover rounded-xl" : "h-auto object-contain"}`}
        />
      </div>
    );
  }

  if (block.type === "text") {
    return (
      <div className="flex flex-col gap-4 py-4 md:py-8 max-w-sm">
        {block.title && <h4 className="text-h4 font-bold text-text-primary tracking-tight">{block.title}</h4>}
        {block.body && <p className="text-small md:text-base text-content-primary leading-relaxed">{block.body}</p>}
      </div>
    );
  }
  return null;
};

export default function CaseStudyLayout({
  project,
  nextProject,
  lang,
}: {
  project: ProjectData;
  nextProject: any;
  lang: string;
}) {
  if (!project.expanded) return null;

  const coverRow = project.expanded.layout?.find((row) => row.block?.isCover);

  const sections = [
    { id: "ask", title: "The Ask", content: project.expanded.theAsk, rows: [] as any[] },
    { id: "problem", title: "Defining the Core Challenge", content: project.expanded.theProblem, rows: [] as any[] },
    { id: "solution", title: "The Solution", content: project.expanded.theSolution, rows: [] as any[] },
    { id: "impact", title: "Impact & Metrics", content: project.expanded.theImpact, metrics: project.expanded.metrics, rows: [] as any[] },
  ];

  let currentSection = 0;
  project.expanded.layout?.forEach((row) => {
    if (row.block?.isCover) return; 

    if (row.anchor === "bento-anchor-0") currentSection = 0;
    else if (row.anchor === "bento-anchor-1") currentSection = 1;
    else if (row.anchor === "bento-anchor-2") currentSection = 2;
    else if (row.anchor === "bento-anchor-3") currentSection = 3;

    sections[currentSection].rows.push(row);
  });

  const stickyOffsets = ["lg:top-[120px]", "lg:top-[176px]", "lg:top-[232px]", "lg:top-[288px]"];

  const scrollToSection = (index: number) => {
    const target = document.getElementById(`section-${index}`);
    if (target) {
      const offset = 120 + (index * 56);
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-surface-primary flex flex-col w-full -mt-8 md:-mt-12 relative z-40">
      <ProjectSubNav client={project.client} id={project.id} lang={lang} />

      <div className="relative w-full px-6 md:px-12 lg:px-24 flex-1 pt-32 lg:pt-[200px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full gap-8 lg:gap-12 mb-16 lg:mb-24 pb-16">
          <aside className="lg:col-start-1 lg:col-span-4 relative z-[60] flex flex-col">
            <ProjectLockup
              id={project.id}
              client={project.client}
              clientLogo={project.expanded.clientLogo}
              agency={project.expanded.agency}
              role={project.expanded.role}
              tags={project.tags}
              isInteractive={false}
            >
              <div className="flex flex-col gap-3">
                <p className="text-base text-content-primary leading-relaxed">{project.expanded.about}</p>
              </div>
            </ProjectLockup>
          </aside>
          
          <div className="lg:col-start-5 lg:col-span-8 relative w-full flex">
            {coverRow && <RenderBlock block={coverRow.block} />}
          </div>
        </div>

        <div id="case-study-content" className="grid grid-cols-1 lg:grid-cols-12 relative w-full gap-x-8 lg:gap-x-12 pb-32">
          {sections.map((section, sIndex) => {
            if (!section.content && section.rows.length === 0) return null;
            
            const topOffset = stickyOffsets[sIndex] || "lg:top-[120px]";
            const rowNum = sIndex + 1;

            return (
              <React.Fragment key={sIndex}>
                
                {/* THE FIX: Replaced inline style with Tailwind lg:[grid-row:var(--row-span)] */}
                <button 
                  onClick={() => scrollToSection(sIndex)}
                  className={`hidden lg:block lg:col-start-1 lg:col-span-4 sticky z-50 w-full h-fit bg-surface-primary transition-all duration-300 cursor-pointer group lg:[grid-row:var(--row-span)] ${topOffset}`}
                  style={{ '--row-span': `${rowNum} / 10` } as React.CSSProperties}
                  aria-label={`Scroll to ${section.title}`}
                >
                  <div className="w-full h-14 flex items-center border-t border-border-subtle/50 transition-colors group-hover:bg-surface-secondary/30">
                    <h3 className="text-tiny uppercase tracking-widest font-bold text-content-secondary group-hover:text-content-primary transition-colors">
                      {section.title}
                    </h3>
                  </div>
                </button>

                {/* THE FIX: Added lg:[grid-row:var(--row-num)]. On mobile, it defaults to standard flow! */}
                <aside 
                  id={`section-${sIndex}`}
                  className="lg:col-start-1 lg:col-span-4 relative h-full z-10 pb-16 lg:pb-32 border-t lg:border-t-0 border-border-subtle/50 lg:[grid-row:var(--row-num)]"
                  style={{ '--row-num': rowNum } as React.CSSProperties}
                >
                  <h3 className="lg:hidden text-tiny uppercase tracking-widest font-bold text-content-secondary mb-4 pt-6">
                    {section.title}
                  </h3>
                  
                  <div className={`flex flex-col gap-4 max-w-sm pointer-events-auto lg:sticky h-fit pt-6 lg:pt-[72px] ${topOffset}`}>
                    {section.content && (
                      <p className="text-base text-content-primary leading-relaxed">
                        {section.content}
                      </p>
                    )}
                    {section.metrics && (
                      <div className="flex flex-col gap-2 w-full pt-4 border-t border-border-subtle mt-4">
                        {section.metrics.map((metric: any, i: number) => (
                          <div key={i} className="flex flex-col items-start gap-1 py-3 w-full border-t border-border-subtle/50 first:border-0 first:pt-0">
                            <span className="text-3xl font-bold text-content-primary tracking-tight">{metric.value}</span>
                            <span className="text-base text-content-secondary leading-relaxed">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </aside>

                {/* THE FIX: Added lg:[grid-row:var(--row-num)] */}
                <div 
                  className="lg:col-start-5 lg:col-span-8 flex flex-col gap-8 lg:gap-16 pt-6 lg:pt-[72px] pb-16 lg:pb-32 border-t border-border-subtle/50 lg:[grid-row:var(--row-num)]"
                  style={{ '--row-num': rowNum } as React.CSSProperties}
                >
                  {section.rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="w-full flex flex-col">
                      {row.type === "full" ? (
                        <RenderBlock block={row.block} />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                          {(row.type.startsWith("split-")) && (() => {
                            if (row.type === "split-4-4-4") {
                              return (
                                <>
                                  <div className="flex flex-col gap-6 md:gap-8 md:col-span-4">
                                    {row.leftCol?.map((block: any, i: number) => <RenderBlock key={`left-${i}`} block={block} />)}
                                  </div>
                                  <div className="flex flex-col gap-6 md:gap-8 md:col-span-4">
                                    {row.midCol?.map((block: any, i: number) => <RenderBlock key={`mid-${i}`} block={block} />)}
                                  </div>
                                  <div className="flex flex-col gap-6 md:gap-8 md:col-span-4">
                                    {row.rightCol?.map((block: any, i: number) => <RenderBlock key={`right-${i}`} block={block} />)}
                                  </div>
                                </>
                              );
                            } else {
                              let leftSpan = "md:col-span-6";
                              let rightSpan = "md:col-span-6";
                              if (row.type === "split-4-8") { leftSpan = "md:col-span-4"; rightSpan = "md:col-span-8"; }
                              if (row.type === "split-8-4") { leftSpan = "md:col-span-8"; rightSpan = "md:col-span-4"; }

                              return (
                                <>
                                  <div className={`flex flex-col gap-6 md:gap-8 ${leftSpan}`}>
                                    {row.leftCol?.map((block: any, i: number) => <RenderBlock key={`left-${i}`} block={block} />)}
                                  </div>
                                  <div className={`flex flex-col gap-6 md:gap-8 ${rightSpan}`}>
                                    {row.rightCol?.map((block: any, i: number) => <RenderBlock key={`right-${i}`} block={block} />)}
                                  </div>
                                </>
                              );
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <NextProjectFooter nextProject={nextProject} lang={lang} />
    </main>
  );
}