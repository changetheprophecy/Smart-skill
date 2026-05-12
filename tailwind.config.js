/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'card-enter': 'cardEnter 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        cardEnter: {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skilllight: {
          "primary": "#6c47ff",
          "primary-content": "#ffffff",
          "secondary": "#ff6b6b",
          "secondary-content": "#ffffff",
          "accent": "#ffd93d",
          "accent-content": "#1a1a2e",
          "neutral": "#1a1a2e",
          "neutral-content": "#ffffff",
          "base-100": "#fafafa",
          "base-200": "#f0f0f5",
          "base-300": "#e0e0eb",
          "base-content": "#1a1a2e",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        skilldark: {
          "primary": "#7c5cff",
          "primary-content": "#ffffff",
          "secondary": "#ff6b6b",
          "secondary-content": "#ffffff",
          "accent": "#ffd93d",
          "accent-content": "#1a1a2e",
          "neutral": "#0f0f1a",
          "neutral-content": "#ffffff",
          "base-100": "#13131f",
          "base-200": "#1a1a2e",
          "base-300": "#22223a",
          "base-content": "#e8e8f0",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    defaultTheme: "skilllight",
  },
}
