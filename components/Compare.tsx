// components/Compare.tsx
"use client";

export default function Compare() {
  return (
    <section id="compare" className="py-16 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* Заголовок секції */}
        <h2 className="mb-6 text-3xl font-extrabold leading-tight">
          <span className="text-black">Метал проти ПВХ — </span>
          <span className="text-indigo-600">AQUASTOK</span>
        </h2>

        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          {/* Шапка для md+ (підписи над своїми колонками) */}
          <div className="hidden md:grid grid-cols-3 bg-indigo-600 text-white">
            <div className="px-5 py-3 font-semibold">Критерії</div>
            <div className="px-5 py-3 font-semibold flex items-center justify-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              AQUASTOK (метал)
            </div>
            <div className="px-5 py-3 font-semibold flex items-center justify-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
              ПВХ
            </div>
          </div>

          {/* Мобільна легенда (коли колонки стають у стовпчик) */}
          <div className="md:hidden flex items-center justify-between gap-3 bg-indigo-600 px-4 py-3 text-white">
            <span className="text-sm font-semibold">Критерії</span>
            <div className="flex items-center gap-3 text-[13px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                AQUASTOK
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
                ПВХ
              </span>
            </div>
          </div>

          {/* Тіло таблиці (3 колонки на md+) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <div className="p-4 font-medium text-gray-700">Міцність/жорсткість</div>
            <div className="p-4">Висока (сталь 0.45–0.5 мм)</div>
            <div className="p-4 bg-black/5">Середня</div>

            <div className="p-4 font-medium text-gray-700">Стійкість до УФ/температур</div>
            <div className="p-4">Висока (полімерне покриття)</div>
            <div className="p-4 bg-black/5">Схильність до деформацій та вигорання</div>

            <div className="p-4 font-medium text-gray-700">Естетика сучасних фасадів</div>
            <div className="p-4">Преміум вигляд, квадратні труби</div>
            <div className="p-4 bg-black/5">Більш «пластиковий» вигляд</div>

            <div className="p-4 font-medium text-gray-700">Пропускна здатність спуску</div>
            <div className="p-4">
              до <span className="whitespace-nowrap">230 м²</span> на 1 спуск
            </div>
            <div className="p-4 bg-black/5">
              ≈<span className="whitespace-nowrap">130 м²</span>
            </div>

            <div className="p-4 font-medium text-gray-700">Шумність</div>
            <div className="p-4">Низька</div>
            <div className="p-4 bg-black/5">Середня</div>

            <div className="p-4 font-medium text-gray-700">Вартість</div>
            <div className="p-4">Вигідна</div>
            <div className="p-4 bg-black/5">Висока</div>
          </div>
        </div>
      </div>
    </section>
  );
}
