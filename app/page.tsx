// app/page.tsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import Specs from "../components/Specs";
import Compare from "../components/Compare";
import MediaGallery from "../components/MediaGallery";
import FAQ from "../components/FAQ";
import Contacts from "../components/Contacts";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main>
        <Specs />
        <Compare />
        <MediaGallery />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
