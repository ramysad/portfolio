import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionary";
import ProjectSubNav from "@/components/ProjectSubNav";
import PasswordGate from "@/components/PasswordGate";

// 1. Import our clean Presenter layout and its Data interface
import CaseStudyLayout, { ProjectData } from "@/components/CaseStudyLayout";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  // Fetch the localization dictionary
  const dict = await getDictionary(lang as "en" | "ar" | "fr");

  // Cast the dictionary data to our ProjectData array structure
  const portfolio = dict.portfolio as unknown as ProjectData[];
  const project = portfolio.find((p) => p.slug === slug);

  // Trigger Next.js 404 page if project doesn't exist or isn't fully expanded
  if (!project || !project.expanded) {
    return notFound();
  }

  // 2. THE HARDENED SECURITY CHECK
  // We check the cookie store to see if the user has already unlocked this specific project
  const cookieStore = await cookies();
  const currentCookieValue = cookieStore.get(`unlocked_${slug}`)?.value;

  const expectedToken =
    project.protected && project.password
      ? Buffer.from(`${slug}-${project.password}-portfolio-secret`).toString(
          "base64",
        )
      : null;

  const isUnlocked = currentCookieValue === expectedToken;

  // If the project is protected and the user hasn't unlocked it, render the PasswordGate
  if (project.protected && !isUnlocked) {
    return (
      <main className="min-h-screen bg-surface-primary flex flex-col w-full -mt-8 md:-mt-12 relative z-40">
        <ProjectSubNav client={project.client} id={project.id} lang={lang} />
        <div className="flex-1 flex items-center justify-center">
          <PasswordGate slug={slug} lang={lang} />
        </div>
      </main>
    );
  }

  // 3. NEXT PROJECT CALCULATION (Endless Loop Engine)
  const currentIndex = portfolio.findIndex((p) => p.slug === slug);

  // If we are at the end of the portfolio array, loop back to the first project [0].
  // Otherwise, grab the next project in the array.
  const nextProject =
    currentIndex >= 0 && currentIndex < portfolio.length - 1
      ? portfolio[currentIndex + 1]
      : portfolio[0];

  // 4. INJECT DATA INTO THE PRESENTER
  // The server has finished its job; hand off the safe data to the client UI.
  return (
    <CaseStudyLayout project={project} nextProject={nextProject} lang={lang} />
  );
}
