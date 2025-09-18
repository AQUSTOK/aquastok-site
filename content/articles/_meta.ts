// content/articles/_meta.ts

export type ArticleMeta = {
  slug: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  import: () => Promise<any>
}

export const articles: ArticleMeta[] = [
  {
    slug: "metal-vs-pvh-odesa",
    title: "Металевий водостік vs ПВХ — Одеса",
    description:
      "Порівняння в нашому кліматі: міцність, УФ, монтаж.",
    date: "2025-09-15",
    tags: ["gutter", "metal", "PVC", "Одеса"],
    import: () => import("./metal-vs-pvh-odesa.mdx"),
  },
  {
    slug: "service-and-care",
    title: "Догляд та сервіс водостоку",
    description: "Як обслуговувати систему, щоб служила довше.",
    date: "2025-09-16",
    tags: ["догляд", "сервіс"],
    import: () => import("./service-and-care.mdx"),
  },
  {
    slug: "pvh-south-ukraine",
    title: "ПВХ у південних регіонах України",
    description: "Що врахувати на сонячних фасадах та в спеку.",
    date: "2025-09-17",
    tags: ["PVC", "південь", "Одеса"],
    import: () => import("./pvh-south-ukraine.mdx"),
  },
  {
    slug: "west-winter",
    title: "Зима на заході: як підготувати водостік",
    description: "Рекомендації для вологого та холодного клімату.",
    date: "2025-09-17",
    tags: ["зима", "догляд", "захід"],
    import: () => import("./west-winter.mdx"),
  },
  {
    slug: "gutter-ukraine",
    title: "Gutter в Україні: що це таке і як правильно обрати",
    description:
      "Gutter = ринви/водостоки. Рекомендації для Києва, Одеси та центру України.",
    date: "2025-09-18",
    tags: ["gutter", "ринви", "Україна", "Київ", "Одеса", "Львів"],
    import: () => import("./gutter-ukraine.mdx"),
  },
  {
    slug: "gutter-symptoms",
    title: "Ознаки проблем із водостоком: коли потрібен сервіс",
    description:
      "Провисання, переливи, іржа, протікання — як діагностувати і що робити.",
    date: "2025-09-18",
    tags: ["сервіс", "ремонт", "діагностика"],
    import: () => import("./gutter-symptoms.mdx"),
  },
  {
    slug: "akvastok-ukrayina",
    title: "АКВАСТОК: водостічні системи в Україні",
    description:
      "Що таке АКВАСТОК (AQUASTOK), як обрати ринви: рекомендації для Києва, Одеси та всієї України.",
    date: "2025-09-18",
    tags: ["аквасток", "AQUASTOK", "ринви", "водостік", "Україна", "Київ", "Одеса"],
    import: () => import("./akvastok-ukrayina.mdx"),
  },
]

export default articles
