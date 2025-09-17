"use client";

import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);

    if (!name.trim() || !phone.trim()) {
      setOk("Будь ласка, заповніть ім’я та телефон.");
      return;
    }

    try {
      setLoading(true);
      const r = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message: msg }),
      });
      if (!r.ok) throw new Error("send failed");
      setOk("Готово! Ми зв’яжемось з вами найближчим часом.");
      setName("");
      setPhone("");
      setMsg("");
    } catch {
      setOk("Не вдалося надіслати. Спробуйте ще раз або зателефонуйте.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contacts" className="bg-gradient-to-b from-white to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-8">
        {/* Ліва колонка — картки з контактами */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-4">Контакти</h2>
          <p className="text-gray-600 mb-6">
            Зв’яжіться з нами або надішліть параметри даху — повернемося з розрахунком у той же день.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-indigo-600 text-sm font-semibold mb-1">Телефон</div>
              <a href="tel:+380966990953" className="text-lg font-medium hover:underline">
                +38 (096) 699-90-53
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-indigo-600 text-sm font-semibold mb-1">E-mail</div>
              <a href="mailto:AQUASTOKUA@gmail.com" className="text-lg font-medium hover:underline">
                AQUASTOKUA@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-indigo-600 text-sm font-semibold mb-1">Сайт</div>
              <a href="https://aquastok.net.ua" className="text-lg font-medium hover:underline">
                aquastok.net.ua
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-indigo-600 text-sm font-semibold mb-1">Графік</div>
              <div className="text-lg font-medium">Пн–Сб, 9:00–18:00</div>
            </div>
          </div>
        </div>

        {/* Права колонка — форма */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-2xl font-semibold mb-6">Отримайте безкоштовний розрахунок</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ваше ім’я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="w-full min-h-[120px] rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Повідомлення (необов’язково)"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Надсилання…" : "Відправити"}
            </button>

            {ok && (
              <div className="text-sm text-gray-700 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                {ok}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
