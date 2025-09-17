export type ArticleMeta = {
  slug: string
  title: string
  description?: string
  date?: string // ISO YYYY-MM-DD
  tags?: string[]
  import: () => Promise<{ default: any }>
}

// УВАГА: весь список усередині одного масиву `articles`
export const articles: ArticleMeta[] = [
  // --- існуючі статті ---
  {
    slug: 'metal-vs-pvh-odesa',
    title: 'Металевий водостік vs ПВХ — Одеса',
    description: 'Порівняння систем у південному кліматі: міцність, УФ, монтаж.',
    date: '2025-09-15',
    tags: ['gutter', 'metal', 'PVC', 'odesa'],
    import: () => import('./metal-vs-pvh-odesa.mdx'),
  },
  {
    slug: 'service-and-care',
    title: 'Догляд та сервіс водостоку',
    description: 'Як обслуговувати систему, щоб служила довше.',
    date: '2025-09-16',
    tags: ['service', 'care'],
    import: () => import('./service-and-care.mdx'),
  },

  // --- нові 6 статей ---
  {
    slug: 'pvh-south-ukraine',
    title: 'Чому ПВХ-водостоки не витримують південне сонце',
    description: 'Одеса та узбережжя: УФ, спека, соляний бриз — що ставити.',
    date: '2025-09-18',
    tags: ['PVC', 'south', 'odesa'],
    import: () => import('./pvh-south-ukraine.mdx'),
  },
  {
    slug: 'metal-vs-pvh-kyiv',
    title: 'Метал чи ПВХ для Києва: герметичність і довговічність',
    description: 'Що краще при великих перепадах температур.',
    date: '2025-09-18',
    tags: ['kyiv', 'material', 'metal', 'PVC'],
    import: () => import('./metal-vs-pvh-kyiv.mdx'),
  },
  {
    slug: 'maintenance-central',
    title: 'Обслуговування ринв у центральній Україні',
    description: 'Як часто чистити і чи потрібні гаттер-гарди.',
    date: '2025-09-18',
    tags: ['maintenance', 'guards', 'central'],
    import: () => import('./maintenance-central.mdx'),
  },
  {
    slug: 'gutter-symptoms',
    title: '«Говорять» ринви: звуки та симптоми несправності',
    description: 'Як зрозуміти, що потрібен сервіс.',
    date: '2025-09-18',
    tags: ['diagnostics', 'service'],
    import: () => import('./gutter-symptoms.mdx'),
  },
  {
    slug: 'west-winter',
    title: 'Захід України: сніг, лід і дощі — як підготувати водостік',
    description: 'Львів, Івано-Франківськ, Ужгород: профілактика і захист.',
    date: '2025-09-18',
    tags: ['west', 'winter', 'snow'],
    import: () => import('./west-winter.mdx'),
  },
  {
    slug: 'downspout-sizing',
    title: 'Скільки покрівлі «тягне» стояк 95×66 мм',
    description: 'Швидка методика підбору — приклад для Києва.',
    date: '2025-09-18',
    tags: ['hydraulics', 'kyiv'],
    import: () => import('./downspout-sizing.mdx'),
  },

  // --- цільова стаття під ключ "gutter" ---
  {
    slug: 'gutter-ukraine',
    title: 'Gutter в Україні: що це таке і як правильно обрати',
    description:
      'Gutter = ринви/водостоки. Рекомендації для Києва, Одеси, заходу та центру України.',
    date: '2025-09-18',
    tags: ['gutter', 'ринви', 'водостоки', 'Україна', 'Київ', 'Одеса', 'Львів'],
    import: () => import('./gutter-ukraine.mdx'),
  },
]
