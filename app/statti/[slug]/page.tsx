import { notFound } from "next/navigation";
import BackHome from "@/components/BackHome";
import { articles } from "@/content/articles/_meta";

type Params = { slug: string };
type ParamsPromise = Promise<Params>;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const meta = articles.find((a) => a.slug === slug);
  if (!meta) return {};
  const url = `${SITE_URL}/statti/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags?.join(", "),
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: meta.title, description: meta.description, locale: "uk_UA" },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  const meta = articles.find((a) => a.slug === slug);
  if (!meta) notFound();
  const MDX = (await meta.import()).default;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    inLanguage: "uk-UA",
    datePublished: meta.date ?? new Date().toISOString().slice(0, 10),
    dateModified: meta.date ?? new Date().toISOString().slice(0, 10),
    author: { "@type": "Organization", name: "AQUASTOK" },
    publisher: { "@type": "Organization", name: "AQUASTOK" },
    keywords: meta.tags?.join(", "),
    mainEntityOfPage: `${SITE_URL}/statti/${slug}`,
  };

  const showGutterCta = slug !== "gutter-ukraine";

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex gap-2">
        <BackHome />
        <BackHome to="/statti" label="До статей" />
      </div>

      <article className="prose dark:prose-invert">
        <header className="mb-6">
          <h1 className="!mb-2">{meta.title}</h1>
          {meta.date && (
            <p className="text-sm text-muted-foreground">
              {new Date(meta.date).toLocaleDateString("uk-UA")}
            </p>
          )}
          {meta.description && (
            <p className="mt-2 text-base text-muted-foreground">{meta.description}</p>
          )}
        </header>

        <MDX />

        {showGutterCta && (
          <section className="mt-10 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Шукаєте <strong>gutter</strong> (ринви) в Україні?</h2>
            <p className="mb-3">
              Пояснення терміну, підбір системи та поради для Києва, Одеси, заходу — у нашому гіді.
            </p>
            <a href="/gutter" className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5">
              Детальніше про gutter →
            </a>
          </section>
        )}

        {meta.tags?.length ? (
          <footer className="mt-10">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">
                  #{t}
                </span>
              ))}
            </div>
          </footer>
        ) : null}
      </article>

      <script
        type="application/ld+json"
        // @ts-ignore
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </main>
  );
}
