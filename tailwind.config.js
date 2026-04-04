/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          brown: '#8D5241',
          'brown-light': '#A67B5B',
          'brown-dark': '#373737',
        },
        // Background colors
        cream: {
          DEFAULT: '#FFF2DA',
          light: '#FFFBE9',
          dark: '#FFEDCC',
          peach: 'rgba(255, 242, 218, 0.74)',
        },
        // Accent colors
        accent: {
          pink: '#E3BCB5',
          'pink-light': 'rgba(227, 188, 181, 0.2)',
          'pink-medium': 'rgba(227, 188, 181, 0.3)',
          tan: 'rgba(166, 123, 91, 0.3)',
          'tan-light': 'rgba(166, 123, 91, 0.22)',
          'tan-medium': 'rgba(166, 123, 91, 0.5)',
        },
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        abhaya: ["AbhayaLibre_400Regular"],
        "abhaya-medium": ["AbhayaLibre_500Medium"],
        "abhaya-semibold": ["AbhayaLibre_600SemiBold"],
        "abhaya-bold": ["AbhayaLibre_700Bold"],
        "abhaya-extrabold": ["AbhayaLibre_800ExtraBold"],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
