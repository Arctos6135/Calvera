/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: "#0f172e",
        primary: "#162244",
        hover: "#1b284f",
        click: "#121c38",
        enabled: "#1d2e5c",
        disabled: "#0d1221",
      },

      dropShadow: {
        "btn-hover": "2px 2px 2px rgba(0, 0, 0, .5)",
        "nav": "0px 2px 2px rgba(0, 0, 0, .5)",
      },

      gridTemplateColumns: {
        "counter": "1fr auto auto",
      },

      minWidth: {
        "dropdown": "max(100vw, max-content)",
      },

      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

