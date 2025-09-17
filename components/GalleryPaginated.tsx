"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Photo = {
  thumb: string; // прев’ю (480–720px)
  full: string;  // повний розмір (1600–2000px)
  alt: string;
  w?: number;
  h?: number;
};

export default function GalleryPaginated({ photos, perPage = 60 }: { photos: Photo[]; perPage?: number }) {
  const sp = useSearchParams();
  const page = Math.max(1, parseInt(sp.get("page") || "1", 10));
  const totalPages = Math.max(1, Math.ceil(photos.length / perPage));

  const slice = useMemo(() => {
    const start = (page - 1) * perPage;
    return photos.slice(start, start + perPage);
  }, [page, perPage, photos]);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {slice.map((p, i) => (
          <figure key={`${p.thumb}-${i}`} className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-gray-100 shadow">
            <a href={p.full} target="_blank" rel="noopener">
              <Image
                src={p.thumb}
                alt={p.alt}
                width={p.w ?? 800}
                height={p.h ?? 600}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </a>
            <figcaption className="text-sm text-gray-600 p-2">{p.alt}</figcaption>
          </figure>
        ))}
      </div>

      {/* Пагінація */}
      <nav className="mt-8 flex items-center justify-center gap-2">
        <PageLink disabled={page===1} href={`/galereya?page=${page-1}`}>← Попередня</PageLink>
        <span className="px-3 py-1 text-sm text-gray-600">Сторінка {page} із {totalPages}</span>
        <PageLink disabled={page===totalPages} href={`/galereya?page=${page+1}`}>Наступна →</PageLink>
      </nav>
    </>
  );
}

function PageLink({ href, children, disabled }: { href: string; children: React.ReactNode; disabled?: boolean }) {
  if (disabled) return <span className="px-3 py-2 rounded-full border border-gray-200 text-gray-400 cursor-not-allowed">{children}</span>;
  return (
    <Link href={href} className="px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
      {children}
    </Link>
  );
}
