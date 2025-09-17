"use client";

export default function CapacityBanner() {
  return (
    <section className="mx-auto mt-8 max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          Об’єм води як у <span className="text-yellow-300">Ø180 ПВХ</span> — ціна і вигляд кращі за <span className="text-green-300">Ø130 ПВХ</span>
        </h2>

        <p className="mx-auto mb-6 max-w-3xl text-indigo-100 md:text-lg">
          Ринва <b>AQUASTOK 135×100</b> приймає у <b className="text-white">2×</b> більше води, ніж
          напівкругла ПВХ Ø130 (13 500&nbsp;мм² проти ~6 640&nbsp;мм²). <br />
          ✔ естетика сучасних фасадів (не видно гаків) • ✔ будь-який колір RAL • ✔ власне виробництво й
          індивідуальні розміри • ✔ доставка по всій Україні
        </p>

        <a
          href="#calc"
          className="inline-block rounded-lg bg-yellow-400 px-8 py-3 font-bold text-gray-900 shadow hover:bg-yellow-300 transition"
        >
          Замовити індивідуальний розрахунок
        </a>
      </div>
    </section>
  );
}
