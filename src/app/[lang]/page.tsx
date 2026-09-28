import { getDictionary } from "@/dictionaries/dictionary";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import Partnerships from "@/components/Partnerships";
import ContactSection from "@/components/ContactSection";
import ScrollRestorer from "@/components/ScrollRestorer";
import HomepageSnapper from "@/components/HomepageSnapper"; // THE FIX: Import the snapper

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar" | "fr");

  return (
    // THE FIX: We revert back to a standard Fragment. 
    // The native browser window is now in control of scrolling again!
    <>
      <ScrollRestorer />
      <HomepageSnapper /> {/* Mounts the global CSS hijack */}
      
      <HeroSection dict={dict.hero} />
      <AboutSection dict={dict.about} />
      <WorkSection dict={dict.portfolio} lang={lang} />
      <Partnerships dict={dict.partnerships} />
      <ContactSection dict={dict.contact} />
    </>
  );
}