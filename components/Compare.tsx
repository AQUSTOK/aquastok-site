// components/Compare.tsx
export default function Compare() {
  const rows: [string, React.ReactNode, React.ReactNode][] = [
    [
      "Міцність/жорсткість",
      <>Висока <span className="text-slate-500">(сталь 0.45–0.5 мм)</span></>,
      "Середня",
    ],
    [
      "Стійкість до УФ/температур",
      <>Висока (полімерне покриття)</>,
      "Схильність до деформацій та вигорання",
    ],
    [
      "Естетика сучасних фасадів",
      <>Преміум вигляд, квадратні труби</>,
      "Більш «пластиковий» вигляд",
    ],
    [
      "Пропускна здатність спуску",
      <>до <span className="font-semibold">230 м²</span> на 1 спуск</>,
      "≈130 м²",
    ],
    ["Шумність", "Низька", "Середня"],
    ["Вартість", "Вигідна", "Висока"],
  ];

  return (
    <section id="compare" className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Метал проти ПВХ
        </h2>

        <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
          {/* Шапка */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="px-5 py-4 text-indigo-100/90 font-medium">Критерій</div>
              <div className="px-5 py-4 font-semibold">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  AQUASTOK (метал)
                </span>
              </div>
              <div className="px-5 py-4 font-semibold">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  ПВХ
                </span>
              </div>
            </div>
          </div>

          {/* Рядки */}
          <div className="divide-y divide-slate-200">
            {rows.map(([label, metal, pvc], i) => (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-3 ${
                  i % 2 ? "bg-slate-50/60" : "bg-white"
                }`}
              >
                <div className="px-5 py-4 text-slate-700">{label}</div>

                <div className="px-5 py-4 bg-indigo-50/60 text-slate-900 font-medium md:border-l-4 md:border-indigo-300">
                  <span className="md:hidden block text-xs text-slate-500 mb-1">AQUASTOK</span>
                  {metal}
                </div>

                <div className="px-5 py-4 text-slate-700">
                  <span className="md:hidden block text-xs text-slate-500 mb-1">ПВХ</span>
                  {pvc}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 bg-slate-50 text-slate-700">
            Підсумок: якщо потрібні{" "}
            <span className="font-semibold text-slate-900">довговічність</span>, стабільна геометрія
            та преміум-естетика — обирайте металевий водостік{" "}
            <span className="font-semibold text-indigo-700">AQUASTOK</span>.
          </div>
        </div>
      </div>
    </section>
  );
}
