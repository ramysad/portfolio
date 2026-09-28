import type { Metadata } from "next";
import { Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getDictionary } from "@/dictionaries/dictionary";
import "../globals.css";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramy Sader | Portfolio",
  description: "Digital experiences, branding, and case studies.",
  // THE FIX: Explicitly tell Next.js to use your existing public SVG as the favicon
  icons: {
    icon: [
      { url: "/images/logo-ramysader.svg", type: "image/svg+xml" }
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const dict = await getDictionary(lang as "en" | "ar" | "fr");

  const primaryFont =
    lang === "ar" ? "var(--font-noto-kufi)" : "var(--font-montserrat)";

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${notoKufi.variable}`}
      style={{ "--font-primary": primaryFont } as React.CSSProperties}
    >
      <body suppressHydrationWarning>
        {/* THE FIX: ThemeProvider is now the direct child of body */}
        <ThemeProvider>
          {/* The styling wrapper is now safely inside the provider */}
          <div className="font-sans bg-surface-primary text-content-primary antialiased min-h-screen flex flex-col transition-colors duration-300">
            <CustomCursor dict={dict.cursor} />
            <Navigation lang={lang} dict={dict.nav} />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}