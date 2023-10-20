module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx'
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        'anuphan': ['Anuphan', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
