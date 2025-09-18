import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CapacityBanner from "@/components/CapacityBanner";
import Specs from "@/components/Specs";
import Compare from "@/components/Compare";
import PhotoGridPreview from "@/components/PhotoGridPreview";
import ArticlesTeaser from "@/components/ArticlesTeaser";
import RalPalette from "@/components/RalPalette";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import VideoRow, { type VideoItem } from "@/components/VideoRow";

export const metadata = {
  title: "Водостічні системи AQUASTOK",
  description:
    "Металеві ринви та труби з полімерним покриттям. Надійність, естетика, професійний монтаж під ключ.",
};

// ▶️ 3 відео (Shorts) — ІД з наданих посилань
const VIDEO_LIST: VideoItem[] = [
  { id: "elgs9QetjRU", title: "AQUASTOK — монтаж / приклад 1" },
  { id: "wpLlkd_zBE0", title: "AQUASTOK — монтаж / приклад 2" },
  { id: "lDnk6ZjsNEM", title: "AQUASTOK — монтаж / приклад 3" }, // ← було i2_Mprzrua4
];

// 🔽 рівно 16 фото для головної
const HOME_PHOTOS_16 = [
  { src: "/images/gallery-01.jpg" },
  { src: "/images/gallery-02.jpg" },
  { src: "/images/gallery-03.jpg" },
  { src: "/images/gallery-04.jpg" },
  { src: "/images/gallery-05.jpg" },
  { src: "/images/gallery-06.jpg" },
  { src: "/images/gallery-07.jpg" },
  { src: "/images/gallery-08.jpg" },
  { src: "/images/gallery-09.jpg" },
  { src: "/images/gallery-10.jpg" },
  { src: "/images/gallery-11.jpg" },
  { src: "/images/gallery-12.jpg" },
  { src: "/images/gallery-13.jpg" },
  { src: "/images/gallery-14.jpg" },
  { src: "/images/gallery-15.jpg" },
  { src: "/images/gallery-16.jpg" },
];

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CapacityBanner />
      <Specs />
      <Compare />

      {/* ✅ Відео над фотогалереєю; з кнопкою переходу на канал */}
      <VideoRow
        videos={VIDEO_LIST}
        channelUrl="https://www.youtube.com/@AQUASTOK-e1s/shorts"
      />

      {/* Тільки 16 фото, 4 в ряд */}
      <PhotoGridPreview photos={HOME_PHOTOS_16} />

      <ArticlesTeaser />
      <RalPalette />
      <FAQ />
      <Contacts />
      <Footer />
      <BackToTop />
    </>
  );
}
