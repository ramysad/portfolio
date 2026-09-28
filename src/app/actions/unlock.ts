"use server";

import { cookies } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionary";

export async function unlockProject(
  slug: string,
  passwordInput: string,
  lang: string,
) {
  const dict = await getDictionary(lang as "en" | "ar" | "fr");
  const project = (dict.portfolio as any[]).find((p) => p.slug === slug);

  if (project && project.password === passwordInput) {
    // Generate a crude but effective secure token so the value isn't just "true"
    const secureToken = Buffer.from(
      `${slug}-${passwordInput}-portfolio-secret`,
    ).toString("base64");

    const cookieStore = await cookies();
    cookieStore.set(`unlocked_${slug}`, secureToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true, // Prevents JavaScript (and DevTools hackers) from easily spoofing the cookie
      secure: process.env.NODE_ENV === "production", // Enforces HTTPS in production
      sameSite: "strict", // Prevents cross-site request forgery
    });

    return { success: true };
  }

  return { success: false, error: "Incorrect access code." };
}
