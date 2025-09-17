// components/Compare.tsx
'use client';

import Link from "next/link";

type Row = {
  k: string;
  metal: string;
  pvc: string;
};

const ROWS: Row[] = [
  { k: "Міцність/жорсткість", metal: "Висока (сталь 0.45–0.5 мм)", pvc: "Середня" },
  { k: "Стійкість до УФ/температур", metal: "Висока (полімерне покриття)", pvc: "Схильність до деформацій та вигорання" },
  { k: "Естетика сучасних фасадів", metal: "Преміум вигляд, квадратні труби", pvc: "Більш «пластиковий» вигляд" },
  { k: "Пропускна здатність спуску", metal: "до 230 м² на 1 спуск", pvc: "≈130 м²" },
  { k: "Шумність", metal: "Низька", pvc: "Середня" },
  { k: "Вартість", metal: "Вигідна", pvc: "Висока" },
];

export default function Compare() {
  return (
    <section id="compare" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Card */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
          {/* Header bar */}
          <div className="bg-indigo-600 text-white px-4 sm:px-6 py-4">
            <div className="flex items-center gap-6">
              <span className="text-base sm:text-lg font-semibold">Критерій</span>

              <div className="ml-auto flex items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/30 px-3 py-1 text-sm sm:text-base">
                  <span className="inline-block size-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold tracking-wide">AQUASTOK (метал)</span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-500/30 px-3 py-1 text-sm sm:text-base">
                  <span className="inline-block size-2.5 rounded-full bg-sky-300" />
                  <span className="font-semibold tracking-wide">ПВХ</span>
                </span>
              </div>
            </div>
          </div>

          {/* Table (desktop) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] divide-y divide-gray-100">
              {/* first row top borders off */}
              {ROWS.map((row, idx) => (
                <div className="contents" key={idx}>
                  <div className="px-4 sm:px-6 py-5 bg-white/60">
                    <div className="text-gray-700 font-medium">{row.k}</div>
                  </div>
                  <div className="px-4 sm:px-6 py-5 bg-indigo-50/40">
                    <div className="text-gray-900 font-semibold">{row.metal}</div>
                  </div>
                  <div className="px-4 sm:px-6 py-5 bg-white">
                    <div className="text-gray-700">{row.pvc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards (mobile) */}
          <div className="md:hidden divide-y divide-gray-100">
            {ROWS.map((row, idx) => (
              <div key={idx} className="px-4 sm:px-6 py-4">
                <div className="text-sm text-gray-500 mb-1">{row.k}</div>

                <div className="rounded-xl overflow-hidden ring-1 ring-gray-200">
                  <div className="flex items-start gap-3 bg-indigo-50/60 px-4 py-3">
                    <span className="mt-1 inline-block size-2.5 rounded-full bg-emerald-500" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">AQUASTOK (метал)</div>
                      <div className="text-gray-900 font-semibold">{row.metal}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white px-4 py-3">
                    <span className="mt-1 inline-block size-2.5 rounded-full bg-sky-400" />
                    <div className="flex-1">
                      <div className="text-xs text-gray-600">ПВХ</div>
                      <div className="text-gray-700">{row.pvc}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="px-4 sm:px-6 py-5 bg-white">
            <p className="text-gray-700">
              Підсумок: якщо потрібні <span className="font-semibold">довговічність</span>, стабільна геометрія та преміум-естетика —
              обирайте металевий водостік <Link href="#top" className="text-indigo-600 hover:text-indigo-700 font-semibold underline decoration-indigo-300 underline-offset-4">AQUASTOK</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
