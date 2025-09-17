"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const TOTAL = 150; // скільки фото у великій галереї

const buildList = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const id = String(i + 1).padStart(2, "0"); // 01 … 150
    return { src: `/images/gallery-${id}.jpg`, alt: `AQUASTOK — робота №${i + 1}` };
  });

export default function AllGalleryPage() {
  const photos = useMemo(() => buildList(TOTAL), []);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const show = (i: number) => {
    setIdx(i);
    setOpen(true);
  };
  const close = () => setOpen(false);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + photos.length) % photos.length),
    [photos.length]
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % photos.length),
    [photos.length]
  );

  // клавіші ← → та Esc тільки коли відкрито
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, prev, next]);

  return (
    <main className="min-h-screen bg-white">
      {/* плаваюча кнопка НА ГОЛОВНУ (показуємо тільки коли лайткс ЗАКРИТИЙ) */}
      {!open && (
        <Link
          href="/#gallery"
          prefetch={false}
          className="fixed top-4 right-4 z-[1000] rounded-full bg-indigo-600 text-white px-4 py-2 shadow-lg hover:bg-indigo-700"
        >
          На головну
        </Link>
      )}

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Галерея робіт</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => show(i)}
              className="group relative overflow-hidden rounded-xl ring-1 ring-black/5 focus:outline-none"
              aria-label={`Відкрити фото ${i + 1}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={600}
                height={400}
                className="aspect-[4/3] w-full object-cover bg-gray-100 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ЛАЙТБОКС */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
          aria-modal
          role="dialog"
        >
          {/* Картинка: клік по фону закриває, по контейнеру/кнопках — ні */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[idx].src}
              alt={photos[idx].alt}
              width={1600}
              height={1200}
              className="max-h-[90vh] w-auto object-contain rounded-xl shadow-2xl"
              priority
            />
          </div>

          {/* Закрити (fixed) */}
          <button
            aria-label="Закрити"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="fixed top-6 right-6 z-[1001] rounded-full bg-indigo-600 text-white w-11 h-11 grid place-content-center shadow-lg hover:bg-indigo-700"
            title="Закрити"
          >
            ✕
          </button>

          {/* ← (fixed) */}
          <button
            aria-label="Попереднє фото"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-[1001] rounded-full bg-indigo-600 text-white w-12 h-12 grid place-content-center shadow-lg hover:bg-indigo-700"
            title="Назад"
          >
            ←
          </button>

          {/* → (fixed) */}
          <button
            aria-label="Наступне фото"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[1001] rounded-full bg-indigo-600 text-white w-12 h-12 grid place-content-center shadow-lg hover:bg-indigo-700"
            title="Далі"
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}
