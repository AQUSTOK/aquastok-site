// app/page.tsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import CapacityBanner from '@/components/CapacityBanner'
import Specs from '@/components/Specs'
import Compare from '@/components/Compare'
import PhotoGridPreview from "../components/PhotoGridPreview";
import FAQ from "../components/FAQ";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

// перші 16 картинок із /public/images/gallery-01.jpg ... -16.jpg
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

        <section id="portfolio">
          <PhotoGridPreview photos={PREVIEW_PHOTOS} />
        </section>

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
