import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionary";
import ProjectSubNav from "@/components/ProjectSubNav";
import PasswordGate from "@/components/PasswordGate";
import ScrollToTop from "@/components/ScrollToTop";
import CaseStudyLayout, { ProjectData } from "@/components/CaseStudyLayout";
import { getPasswordForProject } from "@/config/security"; 

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const dict = await getDictionary(lang as "en" | "ar" | "fr");
  const portfolio = dict.portfolio as unknown as ProjectData[];
  const project = portfolio.find((p) => p.slug === slug);

  if (!project || !project.expanded) {
    return notFound();
  }

  const cookieStore = await cookies();
  const accessTokens = cookieStore.get("portfolio_access")?.value || "";

  const isProtected = String(project.protected) === "true";
  const securePassword = getPasswordForProject(slug);

  const expectedToken = securePassword
    ? Buffer.from(`${securePassword}-portfolio-secret`).toString("base64")
    : "";

  const isUnlocked = isProtected && accessTokens.includes(expectedToken);

  if (isProtected && !isUnlocked) {
    return (
      <main className="min-h-screen bg-surface-primary flex flex-col w-full -mt-8 md:-mt-12 relative z-40">
        <ScrollToTop />
        <ProjectSubNav client={project.client} id={project.id} lang={lang} />
        <div className="flex-1 flex items-center justify-center">
          <PasswordGate slug={slug} lang={lang} />
        </div>
      </main>
    );
  }

  const currentIndex = portfolio.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex >= 0 && currentIndex < portfolio.length - 1
      ? portfolio[currentIndex + 1]
      : portfolio[0];

  return (
    <>
      <ScrollToTop />
      <CaseStudyLayout project={project} nextProject={nextProject} lang={lang} />
    </>
  );
}