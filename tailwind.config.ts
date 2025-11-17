import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1929',
          'navy-light': '#1A2942',
          gold: '#D4AF37',
          'gold-light': '#F2C94C',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Matches your original config
  },
}
export default config
