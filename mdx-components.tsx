import React from "react";

export function useMDXComponents(components: Record<string, any> = {}) {
  return {
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="leading-7 my-4" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className="underline underline-offset-4" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className="list-disc ml-6 my-3" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className="list-decimal ml-6 my-3" {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code className="px-1 py-0.5 rounded bg-black/10" {...props} />
    ),
    ...components,
  };
}

export default useMDXComponents;
