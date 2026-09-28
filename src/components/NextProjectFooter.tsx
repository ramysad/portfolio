import Link from "next/link";

interface NextProjectFooterProps {
  nextProject: {
    slug: string;
    client: string;
    tags: string[];
  };
  lang: string;
}

export default function NextProjectFooter({
  nextProject,
  lang,
}: NextProjectFooterProps) {
  if (!nextProject) return null;

  return (
    <section id="clients" className="w-full relative z-20 px-6 md:px-12 lg:px-24 py-24 lg:py-32 border-t border-border-subtle/50 snap-start">
    <div className="w-full border-t border-border-subtle pt-24 pb-24 mt-12 flex flex-col items-center justify-center relative z-50">
      <span className="text-tiny text-content-secondary uppercase tracking-widest font-bold mb-8">
        Next Project
      </span>

      <Link
        href={`/${lang}/work/${nextProject.slug}`}
        className="group flex flex-col items-center text-center cursor-pointer"
      >
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-content-primary tracking-tighter group-hover:opacity-60 transition-opacity duration-300">
          {nextProject.client}
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {nextProject.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full border border-border-strong text-tiny text-content-secondary uppercase tracking-wider backdrop-blur-sm transition-colors group-hover:border-content-primary group-hover:text-content-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
    </section>
  );
}
