import React from "react";

interface TagProps {
  label: string;
  hoverImage?: string; // Provisioned for your future image URL integration
}

export default function Tag({ label, hoverImage }: TagProps) {
  return (
    <span className="relative group inline-flex items-center justify-center px-4 py-2 rounded-full border border-border-subtle bg-surface-primary hover:bg-surface-secondary text-tiny font-medium tracking-wide text-content-secondary hover:text-content-primary hover:border-content-primary transition-all duration-300 cursor-default">
      {label}
      
      {/* 
        HOVER IMAGE PROVISION: 
        When you eventually pass hoverImage="/images/my-image.jpg", 
        this absolute positioned div will gracefully fade in above the tag.
      */}
      {hoverImage && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 aspect-video bg-surface-secondary border border-border-strong rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden z-50 shadow-2xl">
          <img src={hoverImage} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
    </span>
  );
}