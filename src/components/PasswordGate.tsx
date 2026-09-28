"use client";

import { useState, useTransition, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { unlockProject } from "@/app/actions/unlock";

export default function PasswordGate({
  slug,
  lang,
}: {
  slug: string;
  lang: string;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // THE NUCLEAR OPTION: useLayoutEffect fires before the screen paints
  useLayoutEffect(() => {
    // 1. Tell the browser to ignore Next.js scroll memory
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Temporarily strip any global smooth-scrolling classes
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    
    // 3. Lock the body so the viewport CANNOT scroll down
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.width = "100%";

    // 4. Force the coordinates to absolute zero
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Cleanup: When the user unlocks the project, release the lock so they can scroll the case study
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      html.style.scrollBehavior = "";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await unlockProject(slug, password, lang);
      if (res.success) {
        router.refresh();
      } else {
        setError(res.error || "Access denied");
      }
    });
  };

  return (
    // Added a massive z-index and absolute absolute-zeroing inline styles as a failsafe
    <div 
      style={{ zIndex: 99999, minHeight: '100svh' }} 
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto text-center gap-8 px-6 absolute top-0 left-1/2 -translate-x-1/2 bg-surface-primary"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 font-bold text-content-primary">
          Protected Asset
        </h2>
        <p className="text-content-secondary text-small">
          This case study contains confidential NDA material. Please enter your
          access code to proceed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter access code"
          className="bg-transparent border-b border-border-subtle focus:border-content-primary text-center outline-none py-4 text-h4 transition-colors w-full tracking-widest placeholder:text-content-secondary/50 placeholder:text-small"
          disabled={isPending}
        />

        {error && (
          <span className="text-[#ff4444] text-tiny uppercase tracking-widest font-bold">
            {error}
          </span>
        )}

        <button
          type="submit"
          disabled={isPending || !password}
          className="mt-4 uppercase tracking-widest text-tiny font-bold text-content-primary hover:text-content-secondary transition-colors disabled:opacity-50"
        >
          {isPending ? "Decrypting..." : "Unlock Case Study"}
        </button>
      </form>
    </div>
  );
}