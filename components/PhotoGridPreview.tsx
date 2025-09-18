"use client";

import Image from "next/image";
import Link from "next/link";

type Photo = { src: string; alt?: string };

export default function PhotoGridPreview({ photos }: { photos: Photo[] }) {
  // беремо рівно перші 16 і відсікаємо «биті» шляхи
  const safe = (photos ?? [])
    .filter((p) => typeof p?.src === "string" && p.src.trim().length > 0)
    .slice(0, 16);

  if (safe.length === 0) return null;

  return (
    <section id="gallery" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
  Галерея <span className="text-[#3b34c4]">AQUASTOK</span>
</h2>

        <Link
          href="/galereya/vsi"
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          Дивитися всю галерею →
        </Link>
      </div>

      {/* рівно 4 колонки на всіх брейкпоінтах */}
      <div className="grid grid-cols-4 gap-4">
        {safe.map((p, i) => (
          <Link
            href="/galereya/vsi"
            key={`${p.src}-${i}`}
            className="group block rounded-xl overflow-hidden ring-1 ring-black/5 bg-gray-100"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={p.src.trim()}
                alt={p.alt ?? `AQUASTOK — приклад №${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
                priority={i < 4}
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
