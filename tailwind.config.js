/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#E63946',
        'primary-orange': '#F77F00',
        'primary-yellow': '#FCBF49',
        'primary-navy': '#1D3557',
        'secondary-green': '#06D6A0',
        'secondary-blue': '#118AB2',
      },
    },
  },
};
