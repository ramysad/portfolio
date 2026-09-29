'use server'

import { cookies } from "next/headers";
import { getPasswordForProject } from "@/config/security"; 

export async function unlockProject(slug: string, passwordAttempt: string, lang: string) {
  const actualPassword = getPasswordForProject(slug);

  if (passwordAttempt === actualPassword) {
    // 1. Remove the 'slug' from the token so it represents the password globally
    const newToken = Buffer.from(`${actualPassword}-portfolio-secret`).toString("base64");
    
    const cookieStore = await cookies();
    const existingTokens = cookieStore.get("portfolio_access")?.value || "";
    
    // 2. Use a Set to store multiple unique passwords in case they unlock different clients
    const tokens = new Set(existingTokens.split(",").filter(Boolean));
    tokens.add(newToken);

    // 3. Save the updated list of tokens back to the browser
    cookieStore.set("portfolio_access", Array.from(tokens).join(","), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  }

  return { success: false, error: "Incorrect access code." };
}