"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = { href: string; label: string; anchor?: boolean };

const nav: NavItem[] = [
  { href: "#specs", label: "Характеристики", anchor: true },
  { href: "#compare", label: "Порівняння", anchor: true },
  { href: "/galereya", label: "Галерея" },
  { href: "/statti", label: "Статті" },
  { href: "/gutter", label: "Gutter" }, // цільова сторінка під ключ "gutter"
  { href: "#faq", label: "FAQ", anchor: true },
  { href: "#calc", label: "Контакти", anchor: true },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // якщо ми НЕ на головній, якірні лінки ведуть на /#... (щоб працювали з будь-якої сторінки)
  const anchorHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  const linkBase =
    "text-base text-gray-700 hover:text-black transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 h-[67px] flex items-center justify-between">
        {/* ЛОГО */}
        <Link
          href="/"
          className="font-extrabold text-2xl leading-none text-[#3b34c4]"
          aria-label="На головну"
        >
          AQUASTOK
        </Link>

        {/* Десктоп навігація */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) =>
            item.anchor ? (
              <a
                key={item.href}
                href={anchorHref(item.href)}
                className={linkBase}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkBase} ${
                  pathname === item.href ? "text-black font-medium" : ""
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA — Отримати розрахунок */}
        <Link
          href={anchorHref("#calc")}
          className="hidden md:inline-flex items-center px-5 h-10 rounded-full bg-indigo-600 text-white text-base font-medium hover:bg-indigo-700 shadow"
        >
          Отримати розрахунок
        </Link>

        {/* Бургер */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </button>
      </div>

      {/* Мобільне меню */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex flex-col gap-2">
            {nav.map((item) =>
              item.anchor ? (
                <a
                  key={item.href}
                  href={anchorHref(item.href)}
                  className="py-2 text-base text-gray-700 hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 text-base text-gray-700 hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href={anchorHref("#calc")}
              className="mt-2 inline-flex items-center justify-center px-5 h-10 rounded-full bg-indigo-600 text-white text-base font-medium hover:bg-indigo-700"
              onClick={() => setOpen(false)}
            >
              Отримати розрахунок
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
