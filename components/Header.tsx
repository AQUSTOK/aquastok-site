// components/Header.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70",
        solid ? "shadow-sm bg-white/90" : "bg-white/60",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600">
          AQUASTOK
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="#specs" className="hover:text-indigo-600">Характеристики</a>
          <a href="#compare" className="hover:text-indigo-600">Порівняння</a>
          <a href="#media" className="hover:text-indigo-600">Галерея</a>
          <a href="#faq" className="hover:text-indigo-600">FAQ</a>
          <a href="#contacts" className="hover:text-indigo-600">Контакти</a>
        </nav>

        <a
          href="#contacts"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition"
        >
          Отримати розрахунок
        </a>
      </div>
    </header>
  );
}
