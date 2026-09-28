import { getDictionary } from "@/dictionaries/dictionary";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import Partnerships from "@/components/Partnerships";
import ContactSection from "@/components/ContactSection";
import ScrollRestorer from "@/components/ScrollRestorer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar" | "fr");

  return (
    <>
      <ScrollRestorer />
      <HeroSection dict={dict.hero} />
      <AboutSection dict={dict.about} />
      {/* Injected the lang prop to resolve the TypeScript error */}
      <WorkSection dict={dict.portfolio} lang={lang} />
      <Partnerships dict={dict.partnerships} />
      <ContactSection dict={dict.contact} />
    </>
  );
}
