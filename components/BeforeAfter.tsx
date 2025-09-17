"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  before: { src: string; alt: string; w?: number; h?: number };
  after: { src: string; alt: string; w?: number; h?: number };
  labelBefore?: string;
  labelAfter?: string;
};

export default function BeforeAfter({
  before,
  after,
  labelBefore = "До",
  labelAfter = "Після",
}: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      <div className="relative w-full overflow-hidden rounded-2xl shadow">
        <Image
          src={before.src}
          alt={before.alt}
          width={before.w ?? 1600}
          height={before.h ?? 1200}
          className="w-full h-auto block"
          priority={false}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={after.src}
            alt={after.alt}
            width={after.w ?? 1600}
            height={after.h ?? 1200}
            className="w-full h-auto block"
          />
        </div>

        <div
          className="absolute inset-y-0"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <div className="h-full w-0.5 bg-white/90 shadow" />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(parseInt(e.target.value))}
          className="absolute inset-x-0 bottom-4 mx-auto w-11/12"
        />
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{labelBefore}</div>
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">{labelAfter}</div>
      </div>
    </div>
  );
}
