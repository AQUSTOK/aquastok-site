// components/VideoRow.tsx
"use client";

export type VideoItem = { id: string; title?: string };

export default function VideoRow({
  videos,
  channelUrl,
}: {
  videos: VideoItem[];
  channelUrl?: string;
}) {
  return (
    <section id="media" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
  Відео <span className="text-[#3b34c4]">AQUASTOK</span>
</h2>

        {channelUrl && (
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Наш YouTube канал
            <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <div
            key={v.id ?? i}
            className="overflow-hidden rounded-xl ring-1 ring-black/5 bg-white"
          >
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${v.id}?modestbranding=1&rel=0&playsinline=1`}
                title={v.title ?? `AQUASTOK video ${i + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {v.title && (
              <div className="px-4 py-3 text-sm text-gray-800">{v.title}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
