// components/Docs.tsx
export default function Docs() {
  const items = [
    {
      title: "Технічна документація (UA)",
      desc: "Інструкція з монтажу, специфікації, догляд",
      href: "/files/tech-docs-ua.pdf", // файл з /public/files
    },
  ];

  return (
    <section id="docs" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Технічна документація
      </h2>

      <div className="space-y-4">
        {items.map((it) => (
          <div
            key={it.href}
            className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              {/* простий “ікончик”, без lucide-react */}
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-xl">
                📄
              </div>

              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-gray-600">{it.desc}</div>
              </div>
            </div>

            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
            >
              Відкрити PDF
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
