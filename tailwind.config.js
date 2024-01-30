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
      },

      dropShadow: {
        "btn-hover": "2px 2px 2px rgba(0, 0, 0, .5)",
        "nav": "0px 2px 2px rgba(0, 0, 0, .5)"
      }
    },
  },
  plugins: [],
}

