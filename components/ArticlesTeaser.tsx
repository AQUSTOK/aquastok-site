import Link from 'next/link'
import { articles } from '@/content/articles/_meta'

export default function ArticlesTeaser() {
  const list = [...articles].slice(0, 3)

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold">Корисні статті</h2>
        <Link href="/statti" className="text-sm underline underline-offset-4">
          Усі статті →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(a => (
          <Link key={a.slug} href={`/statti/${a.slug}`}
                className="border rounded-lg p-4 hover:bg-black/5 dark:hover:bg-white/5 transition">
            <h3 className="font-semibold mb-1">{a.title}</h3>
            {a.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">{a.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
