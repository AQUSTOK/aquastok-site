import Link from "next/link";

export default function BackHome({
  to = "/",
  label = "На головну",
  className = "",
}: { to?: string; label?: string; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      <Link
        href={to}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
        aria-label={label}
      >
        <span aria-hidden>←</span>
        <span>{label}</span>
      </Link>
    </div>
  );
}
