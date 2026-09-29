import Image from "next/image";
import React from "react";

export interface PartnershipsDict {
  title: string;
  subtitle: string;
  logos: { src: string; scale: string }[];
}

export default function Partnerships({ dict }: { dict: PartnershipsDict }) {
  if (!dict || !dict.logos) return null;

  return (
    <section id="clients" className="w-full relative z-20 px-6 md:px-12 lg:px-24 py-24 lg:py-32 border-t border-border-subtle/50 snap-start">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16 lg:gap-24 md:pl-32 rtl:md:pr-32 rtl:md:pl-0">
        
        <div className="flex flex-col gap-6 max-w-3xl">
          <h2 className="text-h3 md:text-h2 text-content-primary font-bold tracking-tight">
            {dict.title}
          </h2>
          <p className="text-h6 text-content-secondary leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* THE FIX: Added px-8 md:px-0 to create a safe zone on mobile devices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-16 items-center justify-items-center px-8 md:px-0 -ml-4 rtl:-mr-4">
          {dict.logos.map((logo: { src: string; scale: string }, index: number) => (
            <div 
              key={index} 
              className={`w-full h-16 lg:h-24 max-w-[120px] lg:max-w-[180px] relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-out cursor-default ${logo.scale}`}
            >
              <Image
                src={`/images/${logo.src}`}
                alt="Client Partnership Logo"
                fill
                quality={100} // THE FIX: Forces max sharpness for logos
                className="object-contain invert dark:invert-0"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}