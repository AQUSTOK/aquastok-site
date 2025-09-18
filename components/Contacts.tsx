// components/Contacts.tsx
"use client";

import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  const brand = "#3b34c4";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city, msg, source: "contacts" }),
      });
      setOk(res.ok);
      if (res.ok) {
        setName(""); setPhone(""); setCity(""); setMsg("");
      }
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  function mailto() {
    const subject = encodeURIComponent("Запит на розрахунок AQUASTOK");
    const body = encodeURIComponent(
      `Ім'я: ${name}\nТелефон: ${phone}\нМісто/об'єкт: ${city}\n\nКоментар:\n${msg}`
    );
    window.location.href = `mailto:AQUASTOKUA@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="calc" className="relative scroll-mt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 12% 18%, rgba(59,52,196,.06) 0%, rgba(59,52,196,.03) 45%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: brand }}>
          Зв’яжіться з нами — повернемося з розрахунком у той же день
        </h2>

        {/* 2/5 картки — 3/5 форма */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Ліва панель (компактні картки) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard title="Телефон" brand={brand}>
              <a
                href="tel:+380966990953"
                className="font-semibold hover:underline whitespace-nowrap"
              >
                +38 (096) 699-90-53
              </a>
            </InfoCard>

            <InfoCard title="E-mail" brand={brand}>
              <a
                href="mailto:AQUASTOKUA@gmail.com"
                className="font-semibold hover:underline whitespace-nowrap"
              >
                AQUASTOKUA@gmail.com
              </a>
            </InfoCard>

            <InfoCard title="Сайт" brand={brand}>
              <a
                href="https://aquastok.net.ua"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline whitespace-nowrap"
              >
                aquastok.net.ua
              </a>
            </InfoCard>

            <InfoCard title="Графік" brand={brand}>
              Пн–Сб, 9:00–18:00
            </InfoCard>
          </div>

          {/* Права панель (форма) */}
          <div
            className="lg:col-span-3 rounded-xl bg-white p-5 sm:p-6 ring-1"
            style={{ borderColor: `${brand}26` }}
          >
            <h3 className="text-base sm:text-lg font-semibold mb-3">
              Отримайте безкоштовний розрахунок
            </h3>

            <form className="space-y-3.5" onSubmit={onSubmit}>
              <Input label="Ім’я" value={name} onChange={setName} brand={brand} autoComplete="name" />
              <Input label="Телефон" value={phone} onChange={setPhone} brand={brand} autoComplete="tel" />
              <Input label="Місто / Об’єкт" value={city} onChange={setCity} brand={brand} />
              <Textarea
                label="Площа покрівлі, матеріал даху, колір RAL"
                value={msg}
                onChange={setMsg}
                brand={brand}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full px-5 h-10 text-white text-sm font-medium shadow"
                  style={{ backgroundColor: brand, opacity: loading ? 0.85 : 1 }}
                >
                  {loading ? "Відправляємо…" : "Відправити"}
                </button>

                <button
                  type="button"
                  onClick={mailto}
                  className="inline-flex items-center justify-center rounded-full px-5 h-10 text-sm font-medium border"
                  style={{ color: brand, borderColor: brand }}
                >
                  Надіслати на e-mail
                </button>
              </div>

              {ok === true && <p className="text-xs text-green-600 pt-1">Дякуємо! Ми зв’яжемося з вами найближчим часом.</p>}
              {ok === false && <p className="text-xs text-red-600 pt-1">Сталася помилка. Спробуйте ще раз або напишіть на e-mail.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== компактні картки та поля ====== */

function InfoCard({
  title,
  children,
  brand,
}: {
  title: string;
  children: React.ReactNode;
  brand: string;
}) {
  return (
    <div
      className="rounded-lg bg-white p-3 sm:p-4 ring-1 min-h-[110px]"
      style={{ borderColor: `${brand}26` }}
    >
      <div
        className="text-[10px] font-semibold tracking-wider uppercase mb-1"
        style={{ color: brand }}
      >
        {title}
      </div>
      <div className="text-gray-900 text-[14px] leading-snug">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  brand,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  brand: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full h-10 rounded-lg border px-3 outline-none bg-white"
        style={{ borderColor: "#e5e7eb" }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 3px ${brand}22`;
          e.currentTarget.style.borderColor = brand;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  brand,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  brand: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-lg border px-3 py-2 outline-none bg-white resize-none"
        style={{ borderColor: "#e5e7eb" }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 3px ${brand}22`;
          e.currentTarget.style.borderColor = brand;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#e5e7eb";
        }}
      />
    </label>
  );
}
