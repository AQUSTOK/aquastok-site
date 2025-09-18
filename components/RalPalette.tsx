// components/RalPalette.tsx
import Image from "next/image";

export default function RalPalette() {
  return (
    <section id="ral" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold">
  Карта кольорів RAL <span className="text-[#3b34c4]">AQUASTOK</span>
</h2>


      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center">
          <Image
            src="/images/ral-palette.jpg" // покласти у /public/images
            alt="Карта кольорів RAL"
            width={1000}
            height={700}
            className="rounded-xl shadow max-w-full h-auto"
            priority
          />
          <p className="text-gray-600 mt-4 text-center">
            Зображення палітри; PDF-версія доступна у розділі «Технічна документація».
          </p>
        </div>
      </div>
    </section>
  );
}
