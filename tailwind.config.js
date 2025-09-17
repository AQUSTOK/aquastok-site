// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
};
