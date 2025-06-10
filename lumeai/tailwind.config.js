/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'burnt-sienna': '#984216',
        'ivory-sand': '#E4D6C5',
        'stormy-sky': '#78898F',
        'sage-green': '#8D957E',
        'dark-grey-blue': '#4d516d',
        'muted-purplish-brown': '#a8868c',
        'light-purplish-grey': '#b5a4b4',
        'light-beige-brown': '#d3bcb6',
        'very-light-grey-beige': '#dddad5',
        'lilac': '#b5a4b4',
        'beige': '#d3bcb6',
      },
    },
  },
  plugins: [],
}; 