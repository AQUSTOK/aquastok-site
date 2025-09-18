import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
    // НЕ використовуємо providerImportSource — так Vercel збирає без попередження
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // ✅ Додаємо дозволені домени для зображень (прев'ю YouTube)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },

  async redirects() {
    return [
      // www → без www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.aquastok.net.ua' }],
        destination: 'https://aquastok.net.ua/:path*',
        permanent: true,
      },
      // /contacts → /#calc
      {
        source: '/contacts',
        destination: '/#calc',
        permanent: true,
      },
    ]
  },
}

export default withMDX(nextConfig)
