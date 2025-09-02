// components/FAQ.tsx
export default function FAQ() {
  const items: Array<{ q: string; a: string }> = [
    {
      q: "Які строки виготовлення та монтажу?",
      a: "Стандартний об'єкт: 3–5 днів на виготовлення і 1–3 дні на монтаж (залежить від площі покрівлі).",
    },
    {
      q: "Чи підберете колір під дах?",
      a: "Так, працюємо з палітрою RAL — підбираємо точний тон під дах, софіти та фасад.",
    },
    {
      q: "Яка гарантія?",
      a: "На матеріал і покриття — від 10 років, на монтаж — до 5 років.",
    },
    {
      q: "Що потрібно для розрахунку?",
      a: "Довжина карнизів, висота до землі, розташування зливів, фото/план. Можемо зробити замір на об’єкті.",
    },
  ];

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Питання та відповіді</h2>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map((i) => (
            <details
              key={i.q}
              className="group rounded-2xl ring-1 ring-gray-200 bg-white p-5 shadow-sm open:ring-blue-200"
            >
              <summary className="cursor-pointer list-none select-none font-semibold text-gray-900">
                <span className="mr-2 inline-block rounded-full bg-blue-600 text-white text-xs px-2 py-[2px] align-middle">
                  ?
                </span>
                {i.q}
              </summary>
              <p className="mt-2 text-gray-600">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
