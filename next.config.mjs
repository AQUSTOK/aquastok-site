import path from 'path'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    // Використовуємо локальні MDX-компоненти (без @mdx-js/react)
    providerImportSource: 'mdx-components',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // 🔧 ГОЛОВНЕ: підкладаємо alias, щоб Vercel точно знайшов файл
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'mdx-components': path.join(process.cwd(), 'mdx-components.tsx'),
    }
    return config
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
