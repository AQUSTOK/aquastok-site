// components/Reviews.tsx
"use client";

const REVIEWS = [
  {
    name: "Ірина, Київ",
    text:
      "Замовили водостік AQUASTOK під колір даху. Встановлення за один день, виглядає дуже акуратно.",
    rating: 5,
  },
  {
    name: "Олександр, Львів",
    text:
      "Порахували за 24 години, запропонували кілька рішень. Після дощу вода відводиться ідеально.",
    rating: 5,
  },
  {
    name: "Сергій, Буча",
    text:
      "Надійні кронштейни, товстий метал. Сподобалось, що є палітра RAL під фасад.",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div aria-label={`${n} з 5`} className="text-yellow-500">
      {"★★★★★".slice(0, n)}
      <span className="text-gray-300">{"★★★★★".slice(0, 5 - n)}</span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Відгуки</h2>
        <p className="mt-2 text-sm text-gray-600">
          Реальні враження наших клієнтів. Хочеш залишити відгук? Напиши у форму внизу.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-gray-200"
            >
              <Stars n={r.rating} />
              <p className="mt-3 text-gray-900">{r.text}</p>
              <div className="mt-4 text-sm font-medium text-gray-600">{r.name}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
