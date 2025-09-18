// components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="relative h-[68vh] min-h-[520px] w-full overflow-hidden">
        {/* Фонова картинка */}
        <img
          src="/images/hero.jpg"
          alt="Будинок з газоном із встановленою водостічною системою AQUASTOK"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Темніший градієнт */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 pointer-events-none" />

        {/* М’яка віньєтка */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.45)_100%)]" />

        {/* Контент поверх */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:items-center sm:pb-0">
          <div className="max-w-2xl text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            <p className="inline-block mb-3 rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-wide uppercase">
              Made in Ukraine
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Водостічні системи <span className="text-blue-300">AQUASTOK</span>
            </h1>
            <p className="mt-3 text-white/90">
              Металеві ринви та труби з полімерним покриттям: надійність, естетика, монтаж «під ключ».
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {/* CTA: форма розрахунку на головній */}
              <Link
                href="/#calc"
                prefetch={false}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Отримати розрахунок
              </Link>

              {/* Перехід до блоку з ВІДЕО */}
              <Link
                href="/#video"
                prefetch={false}
                className="rounded-2xl bg-white/90 px-5 py-3 text-sm font-semibold text-gray-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Галерея та відео
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
