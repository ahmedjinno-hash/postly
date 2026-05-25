"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Zap, Wand2, History, Settings, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "المولّد", icon: <Wand2 size={18} /> },
  { href: "/dashboard/history", label: "السجل", icon: <History size={18} /> },
  { href: "/dashboard/settings", label: "الإعدادات", icon: <Settings size={18} /> },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-56 border-l shrink-0" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-5 border-b flex items-center gap-2 font-bold text-lg" style={{ borderColor: "var(--border)" }}>
          <Zap size={20} className="text-sky-500" /> Postly
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                pathname === item.href
                  ? "bg-sky-500 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <UserButton afterSignOutUrl="/" />
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 h-14 border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 font-bold">
            <Zap size={18} className="text-sky-500" /> Postly
          </div>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        {open && (
          <div className="md:hidden border-b p-3 space-y-1" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={cn("flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                  pathname === item.href ? "bg-sky-500 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                )}>
                {item.icon} {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-3 py-2">
              <UserButton afterSignOutUrl="/" />
              <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-1 rounded">
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
