// components/VideoRow.tsx
"use client";
import React from "react";

type Props = { youtubeIds: string[] };

export default function VideoRow({ youtubeIds }: Props) {
  const list = Array.isArray(youtubeIds) ? youtubeIds.slice(0, 3) : [];

  // сітка: 1 відео → 1 колонка, інакше 3
  const grid =
    list.length === 1
      ? "grid grid-cols-1 gap-6"
      : "grid md:grid-cols-3 gap-6";

  return (
    <section id="video" className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Відео</h2>
      <div className={grid}>
        {list.map((id, i) => (
          <div key={`${id}-${i}`} className="aspect-video w-full overflow-hidden rounded-xl shadow">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}`}
              title="AQUASTOK відео"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </section>
  );
}
