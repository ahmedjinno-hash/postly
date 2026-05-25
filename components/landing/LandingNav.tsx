"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Zap } from "lucide-react";

export function LandingNav() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-sky-500" size={22} />
          Postly
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/auth/sign-in" className="text-sm px-4 py-2 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition" style={{ borderColor: "var(--border)" }}>
            دخول
          </Link>
          <Link href="/auth/sign-up" className="text-sm px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition">
            ابدأ مجاناً
          </Link>
        </div>
      </div>
    </nav>
  );
}
