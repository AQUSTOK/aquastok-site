// components/Footer.tsx
export default function Footer() {
  const nav = [
    { label: "Характеристики", href: "#specs" },
    { label: "Порівняння", href: "#compare" },
    { label: "Галерея", href: "#media" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакти", href: "#contacts" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/images/aquastok-logo.svg" alt="AQUASTOK" className="h-8" />
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AQUASTOK. Всі права захищені.
          </p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-gray-600 hover:text-gray-900">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
