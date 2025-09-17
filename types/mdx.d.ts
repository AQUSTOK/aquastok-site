declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXContent: ComponentType<any>
  export default MDXContent
}
