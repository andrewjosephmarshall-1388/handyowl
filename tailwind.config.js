/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f2f9f4',
          100: '#e8f4ec',
          500: '#3a8a55',
          600: '#2d6b42',
          700: '#2a5a3a',
          800: '#22472f',
          900: '#1a3828',
        },
        amber: {
          light: '#fef3d8',
          DEFAULT: '#e8a838',
          dark: '#c98a1a',
        },
        dark: '#1c2b20',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
