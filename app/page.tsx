"use client";
import React, { useState } from "react";

/**
 * AQUASTOK — односторінковий сайт
 * Поклади файли у /public/images/ :
 *  - /public/images/aquastok-logo.svg
 *  - /public/images/hero.jpg  (титульне фото)
 *  - /public/images/gallery-1.jpg .. gallery-88.jpg (галерея)
 */

const Check = () => (
  <span aria-hidden className="inline-block w-5 h-5 rounded-full bg-green-500/90" />
);
const Cross = () => (
  <span aria-hidden className="inline-block w-5 h-5 rounded-full bg-red-500/90" />
);

export default function AquastokLanding() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });
  const [sent, setSent] = useState(false);

  // Відправлення заявки у наш API (який шле в Telegram)
  const submit = async (e) => {
  e.preventDefault();
  const res = await fetch("/api/telegram/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (res.ok) {
    setSent(true);
    setForm({ name: "", phone: "", city: "", message: "" });
  } else {
    alert("Не вдалося надіслати. Спробуйте ще раз.");
  }
};

  const navItems = [
    { id: "about", label: "Про нас" },
    { id: "benefits", label: "Переваги" },
    { id: "compare", label: "Порівняння" },
    { id: "gallery", label: "Галерея" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Отримати розрахунок" }, // було "Контакти"
  ];

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-b from-sky-50 via-white to-slate-50">
      {/* Шапка */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src="/images/aquastok-logo.svg" alt="AQUASTOK logo" className="h-10 w-auto" />
            <span className="sr-only">AQUASTOK</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="hover:text-slate-900 transition">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 inline-block rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 transition"
            >
              Отримати розрахунок
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative">
        <img
          src="/images/hero.jpg"
          alt="Металеві водостічні системи AQUASTOK на сучасному будинку"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <p className="inline-block mb-4 rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide uppercase">
                Made in Ukraine
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Металеві водостічні системи AQUASTOK
                <span className="block text-indigo-300">красивіші за ПВХ і міцніші у 4–6 разів</span>
              </h1>
              <ul className="mt-6 space-y-3 text-base/7 text-indigo-100">
                <li>✔ Термін служби 25+ років, покриття з полімером</li>
                <li>
                  ✔ Ринва AQUASTOK:&nbsp;<strong>+50% об’єму води</strong> у порівнянні з
                  аналогічними пластиковими системами
                </li>
                <li>✔ Будь-який колір RAL, ідеальна геометрія, не тріщать від зміни температури</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Отримати розрахунок
                </a>
                <a
                  href="#gallery"
                  className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white/90 hover:bg-white/10"
                >
                  Портфоліо
                </a>
              </div>
            </div>

            <div className="bg-white/90 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900">Чому AQUASTOK?</h3>
              <p className="mt-2 text-slate-600">
                Промислова точність, антикорозійні матеріали, швидкий монтаж, чиста архітектура.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                {[
                  ["Сталь 0.45–0.5 мм", "Надійність та жорсткість"],
                  ["Полімерне покриття", "UV та солестійкість"],
                  ["Квадратні труби", "Сучасний вигляд фасаду"],
                  ["Гарантія 10–30 років", "Підтримка сервісу"],
                ].map(([t, s]) => (
                  <div key={t} className="rounded-xl border border-slate-200 p-3 bg-white/80">
                    <p className="font-semibold text-slate-800">{t}</p>
                    <p className="text-slate-600">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ПРО НАС */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              AQUASTOK — ми створюємо водостоки, які служать і прикрашають
            </h2>
            <p className="mt-4 text-slate-600">
              Власне виробництво, контроль якості на кожному етапі і монтажні бригади з досвідом понад
              1000 об'єктів: приватні будинки, котеджні містечка, ТРЦ та промислові комплекси. Ми
              працюємо «під ключ»: від заміру і проєкту до монтажу та гарантійного супроводу.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 p-6">
            <p className="text-sm uppercase tracking-wide text-slate-700 font-semibold">Цифри</p>
            <ul className="mt-3 space-y-2 text-slate-800">
              <li>
                <span className="font-bold text-2xl">15</span> років на ринку
              </li>
              <li>
                <span className="font-bold text-2xl">1000+</span> реалізованих об'єктів
              </li>
              <li>
                <span className="font-bold text-2xl">до 230 м²</span> покрівлі на 1 спуск
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ПЕРЕВАГи */}
      <section id="benefits" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3л font-bold">Переваги металевих водостоків AQUASTOK</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              [
                "Міцність без компромісів",
                "Сталь товщиною 0.45–0.5 мм тримає форму, не боїться льоду та снігу.",
              ],
              [
                "Стабільна геометрія",
                "Не веде від температури — стики щільні, нічого не розходиться. Не вигорає на сонці.",
              ],
              [
                "Естетика фасаду",
                "Підкреслює завершення покрівлі та не виділяється, як пластикові системи.",
              ],
              ["Широка палітра RAL", "Підбираємо колір під дах, софіти та віконні профілі."],
              [
                "Тиха робота",
                "Правильна форма і товщина металу зменшують шум дощу, мінімум з'єднань — менше протікань.",
              ],
              ["Легкий догляд", "Гладке покриття — бруд не тримається, достатньо чистки раз на сезон."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 p-6 bg-gradient-to-b from-white to-slate-50">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОРІВНЯННЯ З ПВХ */}
      <section id="compare" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Метал vs ПВХ</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-slate-600">
                <th className="px-4 py-2">Критерій</th>
                <th className="px-4 py-2">AQUASTOK (метал)</th>
                <th className="px-4 py-2">ПВХ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Міцність/жорсткість", <Check key="m1" />, <Cross key="p1" />],
                ["Стійкість до УФ та температур", <Check key="m2" />, <Cross key="p2" />],
                ["Естетика сучасних фасадів", <Check key="m3" />, <Cross key="p3" />],
                ["Вартість", "Конкурентна", "Дешевше старт"],
                ["Шумність", "Низька", "Середня"],
                ["Колірна стабільність", <Check key="m4" />, <Cross key="p4" />],
                ["Пропускна здатність спуску", "до 230 м²", "≈130 м²"],
              ].map(([k, m, p]) => (
                <tr key={String(k)} className="bg-white/80">
                  <td className="px-4 py-3 font-medium text-slate-800">{k as string}</td>
                  <td className="px-4 py-3">{m as any}</td>
                  <td className="px-4 py-3">{p as any}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-slate-600">
          Висновок: якщо потрібні довговічність і вигляд преміум — обирайте металеву систему AQUASTOK.
        </p>
      </section>

      {/* ГАЛЕРЕЯ */}
      <section id="gallery" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Наші об'єкти</h2>
          <p className="mt-2 text-slate-600">Житлові будинки, котеджі, альтанки, промислові об'єкти.</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 88 }).map((_, i) => (
              <img
                key={i}
                src={`/images/gallery-${i + 1}.jpg`}
                alt={`AQUASTOK приклад ${i + 1}`}
                className="aspect-[4/3] w-full object-cover rounded-xl shadow-sm"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">Питання та відповіді</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            [
              "Які строки виготовлення та монтажу?",
              "Стандартний об'єкт: 3–5 днів на виготовлення і 1–3 дні на монтаж (залежить від площі покрівлі).",
            ],
            ["Чи буде водостік під колір даху?", "Так, працюємо з палітрою RAL — підберемо точний тон."],
            ["Що з гарантією?", "На матеріал і покриття — від 10 років, на монтаж — до 5 років."],
            [
              "Скільки треба ринв, труб і комплектуючих?",
              "Ми зробимо повний розрахунок. Вам потрібно лише дати: довжину карнизів, висоту до землі та розташування зливів.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-slate-200 p-5 bg-white">
              <p className="font-semibold">{q}</p>
              <p className="mt-2 text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>
{/* КОНТАКТИ */}
<section id="contact" className="scroll-mt-24 bg-gradient-to-br from-indigo-50 to-sky-50">
  <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
    {/* Ліва колонка: контакти */}
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Контакти</h2>
      <p className="text-slate-600">
        Зв’яжіться з нами будь-яким зручним способом або надішліть параметри даху — повернемося з розрахунком у той же день.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Телефон</p>
          <a href="tel:+380966999053" className="text-lg font-semibold text-slate-900 hover:underline">
            +38 (096) 699-90-53
          </a>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">E-mail</p>
          <a href="mailto:sp.strojtorg@gmail.com" className="text-lg font-semibold text-slate-900 hover:underline">
           sp.strojtorg@gmail.com 
          </a>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Сайт</p>
          <p className="text-lg font-semibold text-slate-900">aquastok.net.ua</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">Графік</p>
          <p className="text-lg font-semibold text-slate-900">Пн-Сб, 9:00–18:00</p>
        </div>
      </div>
    </div>

    {/* Права колонка: форма */}
    <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow border border-slate-200">
      <h3 className="text-xl font-bold mb-4">Отримайте безкоштовний розрахунок</h3>
      <div className="grid grid-cols-1 gap-4">
        <input
          required
          placeholder="Ім'я"
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />
        <input
          required
          placeholder="Телефон"
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.phone}
          onChange={(e)=>setForm({...form,phone:e.target.value})}
        />
        <input
          placeholder="Місто / Об'єкт"
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.city}
          onChange={(e)=>setForm({...form,city:e.target.value})}
        />
        <textarea
          rows={4}
          placeholder="Площа покрівлі, матеріал даху, колір RAL"
          className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={form.message}
          onChange={(e)=>setForm({...form,message:e.target.value})}
        />
        <button
          className="rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700"
          type="submit"
        >
          Відправити
        </button>
        {sent && <p className="text-green-700">Дякуємо! Ми зв'яжемося з вами найближчим часом.</p>}
      </div>
    </form>
  </div>
</section>

      {/* CTA + ПІДВАЛ */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl bg-slate-900 text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Готові перейти на металевий водостік?</h3>
            <p className="text-white/80">AQUASTOK — красивіший, міцніший та надійніший за ПВХ. Зробимо під ключ.</p>
          </div>
          <a href="#contact" className="rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-white/90">
            Отримати розрахунок
          </a>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/aquastok-logo.svg" alt="AQUASTOK" className="h-8" />
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} AQUASTOK. Всі права захищені.
            </p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-slate-600 hover:text-slate-900">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
