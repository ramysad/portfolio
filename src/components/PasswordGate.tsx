"use client";

import { useState, useTransition } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const res = await unlockProject(slug, password, lang);
      if (res.success) {
        // If successful, refresh the current route to re-run the server component and reveal the case study
        router.refresh();
      } else {
        setError(res.error || "Access denied");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] w-full max-w-md mx-auto text-center gap-8 px-6">
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
