const colorPalette = require('./tailwind-color-palette.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@podman-desktop/ui-svelte/dist/**/*.{svelte,ts,css}'],
  theme: {
    colors: {
      // import colors from the color palette
      ...colorPalette,
    },
    fontSize: {
      xs: '10px',
      sm: '11px',
      base: '12px',
      lg: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '24px',
      '5xl': '30px',
      '6xl': '36px',
    },
  },
  plugins: [],
};
