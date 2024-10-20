/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'var(--poppins)',
        'inter': 'var(--inter)',
      },
      colors: {
        "golden-1000": "#C3976A",
        "golden-1100": '#924A36',
        "golden-1200": '#924936',
        "golden-1300": '#3F3022',
        "golden-1400": '#936d4f',
        "black-1000": '#3B160E',
        "green-1000": '#10BD7A',
        "gray-1000": '#514F4F',
      },
      screens: {
        'xs': '375px',
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        'xxl': '1280px',
        '2xl': '1366px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      backgroundImage: {
        'bg-tag': 'linear-gradient(270deg, #F86225 0%, #FC2425 100%)',
        'text-bg': 'linear-gradient(91deg, #EFDDBC 31.8%, rgba(107, 64, 43, 0.65) 143.17%)',
        'bg-btn': 'linear-gradient(97deg, rgba(195, 151, 106, 0.3) 1.98%, rgba(195, 151, 106, 0.3) 43.12%, rgba(195, 151, 106, 0.3) 99.93%)',
        'golden-bg': 'linear-gradient(97deg, #C3976A 1.98%, #C3976A 43.12%, #C3976A 99.93%)',
        'heading-bg': 'linear-gradient(128deg, #C3976A 28.17%, rgba(195, 151, 106, 0.80) 140.45%, rgba(195, 151, 106, 0.60) 257.64%)',
      },
      dropShadow: {
        '3xl': '0px 5px 16px 0px rgba(183, 183, 183, 0.25)',

      },
    },
  },
  plugins: [],
};
