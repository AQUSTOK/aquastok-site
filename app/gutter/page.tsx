import BackHome from "@/components/BackHome";
import GutterArticle from "@/content/articles/gutter-ukraine.mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  title: "Gutter в Україні — водостоки/ринви: Київ, Одеса, Львів | AQUASTOK",
  description:
    "Gutter (водостоки, ринви) для приватних будинків та комерційних об'єктів в Україні. Підбір, монтаж, сервіс: Київ, Одеса, Львів, Центр, Захід.",
  keywords:
    "gutter, водостоки, ринви, водостічні системи, Київ, Одеса, Львів, Україна, монтаж, сервіс",
  alternates: { canonical: `${SITE_URL}/gutter` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/gutter`,
    title: "Gutter в Україні — водостоки/ринви: Київ, Одеса, Львів",
    description:
      "Пояснення терміну gutter, підбір системи, рекомендації для регіонів України.",
    locale: "uk_UA",
  },
  robots: { index: true, follow: true },
};

export default function GutterLanding() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <BackHome />
      <article className="prose dark:prose-invert">
        <GutterArticle />
      </article>
    </main>
  );
}
