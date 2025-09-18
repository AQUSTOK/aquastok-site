"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem =
  | { href: string; label: string; anchorId?: string } // якір всередині головної
  | { href: string; label: string; anchorId?: undefined };

const nav: NavItem[] = [
  { href: "/#specs", label: "Характеристики", anchorId: "specs" },
  { href: "/#compare", label: "Порівняння", anchorId: "compare" },
  { href: "/galereya/vsi", label: "Галерея" }, // окрема сторінка
  { href: "/#faq", label: "FAQ", anchorId: "faq" },
  { href: "/#calc", label: "Контакти", anchorId: "calc" }, // якір на головній
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    !href.startsWith("/#") && pathname === href;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onAnchorClick = (e: React.MouseEvent, id?: string) => {
    if (!id) return; // не якір — нехай Link працює як завжди
    // якщо ми вже на головній — не міняємо маршрут, просто скролимо
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      scrollToId(id);
    }
  };

  return (
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-[67px] flex items-center justify-between">
        {/* Лого */}
        <Link
          href="/"
          prefetch={false}
          className="font-extrabold text-2xl leading-none text-[#3b34c4]"
        >
          AQUASTOK
        </Link>

        {/* Навігація */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={(e) => onAnchorClick(e, item.anchorId)}
              className={`text-base hover:text-black ${
                isActive(item.href) ? "text-black font-medium" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/#calc"
          prefetch={false}
          onClick={(e) => onAnchorClick(e, "calc")}
          className="hidden md:inline-flex items-center px-5 h-10 rounded-full bg-indigo-600 text-white text-base font-medium hover:bg-indigo-700 shadow"
        >
          Отримати розрахунок
        </Link>

        {/* Burger */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={(e) => {
                  onAnchorClick(e, (item as any).anchorId);
                  setOpen(false);
                }}
                className="py-2 text-base text-gray-700 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#calc"
              prefetch={false}
              onClick={(e) => {
                onAnchorClick(e, "calc");
                setOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center px-5 h-10 rounded-full bg-indigo-600 text-white text-base font-medium hover:bg-indigo-700"
            >
              Отримати розрахунок
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
