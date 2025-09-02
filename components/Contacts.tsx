// components/Contacts.tsx
"use client";

import { useState } from "react";

const EMAIL = "AQUASTOKUA@gmail.com";
const TEL   = "+38 (096) 699-90-53";

export default function Contacts() {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [city, setCity]       = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [ok, setOk]           = useState<null | boolean>(null);
  const [err, setErr]         = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setOk(null);
    setErr(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok !== true) {
        throw new Error(data?.error || "Помилка надсилання");
      }

      setOk(true);
      setName(""); setPhone(""); setCity(""); setMessage("");
    } catch (e: any) {
      setOk(false);
      setErr(e?.message || "Не вдалося надіслати, спробуйте ще раз.");
    } finally {
      setSending(false);
    }
  };

  const mailto = () => {
    const subject = encodeURIComponent("Запит на розрахунок AQUASTOK");
    const body = encodeURIComponent(
      `Ім'я: ${name}\nТелефон: ${phone}\nМісто/об'єкт: ${city}\nПовідомлення: ${message}\n`
    );
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contacts" className="scroll-mt-24 bg-gradient-to-br from-indigo-50 to-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
        {/* Ліва колонка: контакти */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Контакти</h2>
          <p className="text-slate-600">
            Зв’яжіться з нами або надішліть параметри даху — повернемося з розрахунком у той же день.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Телефон</p>
              <a href="tel:+380966999053" className="text-lg font-semibold text-slate-900 hover:underline">
                {TEL}
              </a>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">E-mail</p>
              <a href={`mailto:${EMAIL}`} className="text-lg font-semibold text-slate-900 hover:underline">
                {EMAIL}
              </a>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Сайт</p>
              <p className="text-lg font-semibold text-slate-900">aquastok.net.ua</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
              <p className="text-sm text-slate-500">Графік</p>
              <p className="text-lg font-semibold text-slate-900">Пн–Сб, 9:00–18:00</p>
            </div>
          </div>
        </div>

        {/* Права колонка: форма */}
        <form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 shadow border border-slate-200">
          <h3 className="text-xl font-bold mb-4">Отримайте безкоштовний розрахунок</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              required placeholder="Ім'я"
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <input
              required placeholder="Телефон"
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={phone} onChange={(e) => setPhone(e.target.value)}
            />
            <input
              placeholder="Місто / Об'єкт"
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={city} onChange={(e) => setCity(e.target.value)}
            />
            <textarea
              rows={4} placeholder="Площа покрівлі, матеріал даху, колір RAL"
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={message} onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex flex-wrap gap-3 items-center">
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 disabled:opacity-60"
              >
                {sending ? "Відправляємо…" : "Відправити"}
              </button>
              <a
                href={mailto()}
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                title="Надіслати як e-mail"
              >
                Надіслати на e-mail
              </a>
            </div>
            {ok === true && <p className="text-green-700">Дякуємо! Ми зв'яжемося з вами найближчим часом.</p>}
            {ok === false && <p className="text-red-600">Помилка: {err}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
