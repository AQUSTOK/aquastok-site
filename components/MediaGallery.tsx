// components/MediaGallery.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

/** Скільки фото максимум перевіряти у /public/images/ */
const MAX_COUNT = 86;

/** Відео з описами — підстав свої YouTube-URL або чисті ID (11 символів) */
type VideoItem = { urlOrId: string; title: string; desc: string };
const VIDEO_ITEMS: VideoItem[] = [
  {
    urlOrId: "A47U50LqD8k",
    title: "Огляд системи AQUASTOK",
    desc: "Ключові елементи та зовнішній вигляд.",
  },
  {
    // твоє Shorts-відео
    urlOrId: "https://youtube.com/shorts/wpLlkd_zBE0?feature=share",
    title: "Монтаж водостоку — покроково",
    desc: "Від кронштейнів до встановлення труб.",
  },
  {
    urlOrId: "https://youtube.com/shorts/elgs9QetjRU",
    title: "Кейс на об’єкті (Shorts)",
    desc: "Швидкий огляд готового об’єкта.",
  },
  // можна додавати ще:
  // { urlOrId: "https://youtu.be/XXXXXXXXXXX", title: "Назва відео", desc: "Короткий опис" },
];

/** Витягнути YouTube ID з довільного посилання або з чистого ID */
function extractYouTubeId(input: string): string | null {
  try {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const u = new URL(input);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\/+/, "").split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    const v = u.searchParams.get("v");
    if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    const parts = u.pathname.split("/").filter(Boolean);
    const ix = parts.findIndex((p) => ["shorts", "embed", "v"].includes(p));
    if (ix >= 0 && parts[ix + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[ix + 1])) return parts[ix + 1];
    return null;
  } catch {
    return null;
  }
}

/** Перевірка існування зображення */
const tryLoad = (url: string) =>
  new Promise<boolean>((res) => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = url;
  });

type Pic = { src: string; idx: number };

export default function MediaGallery() {
  const [pics, setPics] = useState<Pic[]>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  /** Модалка з палітрою RAL (зображення) */
  const RAL_IMG = "/images/ral-palette.jpg";
  const [ralOpen, setRalOpen] = useState(false);

  /** Зібрати наявні /images/gallery-*.jpg або .JPG (1..MAX_COUNT) */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found: Pic[] = [];
      for (let i = 1; i <= MAX_COUNT; i++) {
        const jpg = `/images/gallery-${i}.jpg`;
        const JPG = `/images/gallery-${i}.JPG`;
        const okJpg = await tryLoad(jpg);
        const okJPG = okJpg ? false : await tryLoad(JPG);
        if (okJpg || okJPG) found.push({ src: okJpg ? jpg : JPG, idx: i - 1 });
      }
      if (!cancelled) setPics(found);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const prev = () => setIdx((i) => (i - 1 + pics.length) % pics.length);
  const next = () => setIdx((i) => (i + 1) % pics.length);

  /** Клавіатура для обох модалок */
  useEffect(() => {
    if (!open && !ralOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setRalOpen(false);
      }
      if (open && e.key === "ArrowLeft") prev();
      if (open && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, ralOpen]);

  /** Свайп для фото */
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    startX.current = null;
  };

  return (
    <section id="media" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Галерея — відео, фото та RAL</h2>

        {/* ▶️ Відео */}
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Відео</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VIDEO_ITEMS.map((v) => {
              const id = extractYouTubeId(v.urlOrId);
              if (!id) return null;
              const embedUrl = `https://www.youtube.com/embed/${id}?rel=0`;
              const watchUrl = `https://www.youtube.com/watch?v=${id}`;
              return (
                <figure key={id} className="rounded-2xl ring-1 ring-gray-200 bg-white overflow-hidden shadow-sm">
                  <div className="aspect-video w-full overflow-hidden bg-black">
                    <iframe
                      className="h-full w-full"
                      src={embedUrl}
                      title={v.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="p-4">
                    <div className="text-sm font-semibold text-gray-900">{v.title}</div>
                    <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
                    <a
                      href={watchUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
                      title="Відкрити на YouTube в новій вкладці"
                    >
                      Відкрити на YouTube ↗
                    </a>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        {/* 🖼 Фото-прев’ю (object-contain) */}
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

        {/* 📄 Технічна документація + 🎨 Карта RAL */}
        <div className="mt-12">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Технічна документація</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/pdfs/aquastok-technical-docs-ua.pdf"
              className="flex items-center justify-between rounded-2xl border p-5 shadow-sm bg-white hover:bg-white/80"
            >
              <div>
                <div className="font-semibold text-gray-900">Технічна документація (UA)</div>
                <div className="text-sm text-gray-600">Інструкція з монтажу, специфікації, догляд</div>
              </div>
              <span className="text-sm font-semibold text-blue-600">Відкрити</span>
            </a>

            <button
              type="button"
              onClick={() => setRalOpen(true)}
              className="rounded-2xl border p-0 overflow-hidden shadow-sm bg-white ring-1 ring-gray-200 text-left hover:bg-white/80"
              title="Відкрити палітру кольорів RAL"
            >
              <div className="flex items-stretch">
                <div className="hidden sm:block w-40 shrink-0 overflow-hidden">
                  <img
                    src={RAL_IMG}
                    alt="Палітра кольорів RAL AQUASTOK"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="p-5 flex-1 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">Карта кольорів RAL</div>
                    <div className="text-sm text-gray-600">Зображення палітри; нижче — PDF-версія</div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">Відкрити</span>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            PDF-версія:{" "}
            <a href="/pdfs/aquastok-ral-colors.pdf" className="text-blue-600 underline">
              завантажити
            </a>
            .
          </div>
        </div>
      </div>

      {/* Модалка: перегляд фото */}
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

            <div className="relative overflow-hidden rounded-xl bg-black" style={{ maxHeight: "85vh", maxWidth: "92vw" }}>
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

      {/* Модалка: зображення палітри RAL */}
      {ralOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80" role="dialog" aria-modal="true" onClick={() => setRalOpen(false)}>
          <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setRalOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white"
              aria-label="Закрити"
            >
              ✕ Закрити
            </button>

            <div className="relative overflow-hidden rounded-xl bg-black" style={{ maxHeight: "85vh", maxWidth: "92vw" }}>
              <img
                src={RAL_IMG}
                alt="Палітра кольорів RAL AQUASTOK"
                className="block h-auto w-auto max-h-[85vh] max-w-[92vw] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
