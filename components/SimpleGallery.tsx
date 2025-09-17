// components/SimpleGallery.tsx
"use client";

import { useEffect, useRef, useState } from "react";

// скільки фото максимум (останнє — gallery-86.(jpg/JPG))
const MAX_COUNT = 86;

type Pic = { src: string; idx: number };

const tryLoad = (url: string) =>
  new Promise<boolean>((res) => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = url;
  });

export default function SimpleGallery() {
  console.log("SimpleGallery v1 mounted");

  const [pics, setPics] = useState<Pic[]>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // підтягуємо тільки реально наявні файли (.jpg / .JPG)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found: Pic[] = [];
      for (let i = 1; i <= MAX_COUNT; i++) {
        const low = `/images/gallery-${i}.jpg`;
        const hi = `/images/gallery-${i}.JPG`;
        const okLow = await tryLoad(low);
        const okHi = okLow ? false : await tryLoad(hi);
        if (okLow || okHi) found.push({ src: okLow ? low : hi, idx: i - 1 });
      }
      if (!cancelled) setPics(found);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openAt = (i: number) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);
  const prev  = () => setIdx((i) => (i - 1 + pics.length) % pics.length);
  const next  = () => setIdx((i) => (i + 1) % pics.length);

  // клавіатура та свайп (без зума)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) prev(); else if (dx < -40) next();
    startX.current = null;
  };

  return (
    <section id="media" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Галерея — фото, відео та PDF (без зума)
        </h2>

        {/* ▶️ YouTube – заміни VIDEO_ID */}
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-gray-200">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
            title="AQUASTOK відео"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Прев’ю — завжди повністю в рамці */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pics.map((p, i) => (
            <button
              key={p.src}
              onClick={() => openAt(i)}
              className="group block overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <img
                  src={p.src}
                  alt={`AQUASTOK фото ${p.idx + 1}`}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </button>
          ))}
          {pics.length === 0 && (
            <div className="col-span-full text-gray-600">
              Завантажую фото… Перевір файли у <code>/public/images/</code>
            </div>
          )}
        </div>

        {/* PDF-посилання (опційно підправиш шляхи) */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <a href="/pdfs/AQUASTOK-installation-ukr.pdf" className="flex items-center justify-between rounded-2xl border p-5 shadow-sm hover:bg-white bg-white">
            <div>
              <div className="font-semibold text-gray-900">Інструкція з монтажу (UA)</div>
              <div className="text-sm text-gray-600">PDF</div>
            </div>
            <span className="text-sm font-semibold text-blue-600">Завантажити</span>
          </a>
          <a href="/pdfs/AQUASTOK-colors-RAL.pdf" className="flex items-center justify-between rounded-2xl border p-5 shadow-sm hover:bg-white bg-white">
            <div>
              <div className="font-semibold text-gray-900">Карта кольорів RAL</div>
              <div className="text-sm text-gray-600">PDF</div>
            </div>
            <span className="text-sm font-semibold text-blue-600">Завантажити</span>
          </a>
        </div>
      </div>

      {/* Лайтбокс без зума */}
      {open && pics.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/80" role="dialog" aria-modal="true" onClick={close}>
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white"
              aria-label="Закрити"
            >
              ✕ Закрити
            </button>

            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-900 shadow hover:bg-white"
              aria-label="Попереднє"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-900 shadow hover:bg-white"
              aria-label="Наступне"
            >
              →
            </button>

            {/* Фото завжди всередині рамки */}
            <div
              className="relative overflow-hidden rounded-xl bg-black"
              style={{ maxHeight: "85vh", maxWidth: "92vw" }}
            >
              <img
                src={pics[idx].src}
                alt={`AQUASTOK фото ${pics[idx].idx + 1}`}
                className="block h-auto w-auto max-h-[85vh] max-w-[92vw] object-contain select-none"
                draggable={false}
              />
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 shadow">
              {idx + 1} / {pics.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
