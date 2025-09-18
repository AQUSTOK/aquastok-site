// app/statti/page.tsx
import Link from "next/link";
import BackHome from "@/components/BackHome";
import { articles } from "@/content/articles/_meta";

export const metadata = {
  title: "Статті",
  description: "Корисні матеріали AQUASTOK: монтаж, порівняння, догляд.",
};

export default function ArticlesIndex() {
  const list = [...articles].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <BackHome />
      <h1 className="text-3xl font-bold mb-6">Статті</h1>

      <ul className="space-y-4">
        {list.map((a) => (
          <li
            key={a.slug}
            className="border rounded-lg p-4 hover:bg-black/5 transition"
          >
            <Link href={`/statti/${a.slug}`} className="block">
              <h2 className="text-xl font-semibold mb-1">{a.title}</h2>
              {a.description && (
                <p className="text-sm text-gray-600">{a.description}</p>
              )}
              {a.date && (
                <p className="text-xs mt-2 text-gray-500">
                  {new Date(a.date).toLocaleDateString("uk-UA")}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
