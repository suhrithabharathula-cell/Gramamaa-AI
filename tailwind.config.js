/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        sage: {
          50: '#f6f9f5',
          100: '#edf3ec',
          200: '#dae6d8',
          300: '#bed4bc',
          400: '#9dbd99',
          500: '#7fa37a',
          600: '#64855f',
          700: '#4f6b4b',
          800: '#40563d',
          900: '#364734',
        },
        peach: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Noto Sans Telugu"',
          '"Telugu MN"',
          'Gautami',
          'sans-serif',
        ],
        telugu: ['"Noto Sans Telugu"', '"Telugu MN"', 'Gautami', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
