/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "half": "50vw",
        "screen-1/4": "25vw",
        "455": "455px"
      },
      height: {
        "half": "50vh"
      },
      backgroundColor: {
        "op-purple": "233, 213, 255, 0.7"
      },
      maxWidth: {
        "455": "455px"
      }
    },
  },
  plugins: [],
}

