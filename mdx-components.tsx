// mdx-components.ts
import type { MDXComponents } from 'mdx/types'
import React from 'react'

const baseMap: MDXComponents = {
  h1: (p) => <h1 className="text-3xl font-bold mt-8 mb-4" {...p} />,
  h2: (p) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...p} />,
  h3: (p) => <h3 className="text-xl font-semibold mt-5 mb-2" {...p} />,
  p:  (p) => <p className="leading-7 my-4" {...p} />,
  a:  (p) => <a className="underline underline-offset-4" {...p} />,
  ul: (p) => <ul className="list-disc ml-6 my-3" {...p} />,
  ol: (p) => <ol className="list-decimal ml-6 my-3" {...p} />,
  code: (p) => <code className="px-1 py-0.5 rounded bg-black/10" {...p} />
}

// ⬇️ MDX очікує САМЕ ФУНКЦІЮ з таким ім’ям
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...baseMap, ...components }
}
