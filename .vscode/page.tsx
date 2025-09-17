// app/page.tsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import CapacityBanner from "../components/CapacityBanner";
import Specs from "../components/Specs";
import Compare from "../components/Compare";
import PhotoGridPreview from "../components/PhotoGridPreview";
import ArticlesTeaser from "../components/ArticlesTeaser";
import RalPalette from "../components/RalPalette";
import Docs from "../components/Docs";
import FAQ from "../components/FAQ";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

// Рівно 16 фото для прев’ю на головній
const PREVIEW_PHOTOS = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/gallery-${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `AQUASTOK — приклад №${i + 1}`,
}));

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />

      <main>
        <CapacityBanner />

        <section id="specs">
          <Specs />
        </section>

        <section id="compare">
          <Compare />
        </section>

        {/* Прев’ю-галерея (16 фото). Ідентифікатор #gallery — для кнопки "На головну" */}
        <section id="gallery">
          <PhotoGridPreview photos={PREVIEW_PHOTOS} />
        </section>

        {/* Карта RAL як зображення */}
        <RalPalette />

        {/* Тизери статей */}
        <ArticlesTeaser />

        {/* Технічна документація (кнопка відкриває /files/tech-docs-ua.pdf у новій вкладці) */}
        <Docs />

        <section id="faq">
          <FAQ />
        </section>

        <section id="calc">
          <Contacts />
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
