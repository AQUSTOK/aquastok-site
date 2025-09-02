// components/Specs.tsx
"use client";

type Item = { title: React.ReactNode; desc: React.ReactNode };

const items: Item[] = [
  {
    title: <>Сталь <mark>0.45–0.5 мм</mark></>,
    desc: <>Висока жорсткість та довговічність</>,
  },
  {
    title: <>Полімерне покриття</>,
    desc: <>Стійкість до УФ та <mark>соляних туманів</mark></>,
  },
  {
    title: <>Квадратні труби</>,
    desc: <>Сучасний вигляд фасаду</>,
  },
  {
    title: <>Велика ринва</>,
    desc: <>
      До <mark>+50% об’єму</mark> води проти ПВХ аналогів
    </>,
  },
  {
    title: <>Гарантія <mark>10–30 років</mark></>,
    desc: <>Підтримка сервісу</>,
  },
  {
    title: <>Будь-який <mark>RAL</mark></>,
    desc: <>Точний підбір під дах/софіти/фасад</>,
  },
];

export default function Specs() {
  return (
    <section
      id="specs"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16
                      [&_mark]:bg-amber-200/60 [&_mark]:px-1 [&_mark]:rounded
                      [&_mark]:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Характеристики <span className="text-indigo-600">AQUASTOK</span>
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow transition
                         ring-1 ring-transparent hover:ring-indigo-100"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-3.5 w-3.5 rounded-full bg-emerald-500/90 shadow-[0_0_0_2px_rgba(16,185,129,0.15)]"
                />
                <div>
                  <p className="text-base font-semibold text-slate-900">{it.title}</p>
                  <p className="mt-1.5 text-slate-600">{it.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-slate-600">
          Термін служби <mark>25+ років</mark>. Гладке покриття — менше шуму та бруду.
          Менше стиків — менше протікань.
        </p>
      </div>
    </section>
  );
}
