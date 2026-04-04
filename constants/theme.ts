// Face By You - Design Tokens from Figma

export const colors = {
  // Primary palette
  primary: {
    brown: '#8D5241',
    brownLight: '#A67B5B',
    brownDark: '#373737',
  },
  // Background colors
  background: {
    cream: '#FFF2DA',
    creamLight: '#FFFBE9',
    creamDark: '#FFEDCC',
    peach: 'rgba(255, 242, 218, 0.74)',
  },
  // Accent colors
  accent: {
    pink: '#E3BCB5',
    pinkLight: 'rgba(227, 188, 181, 0.2)',
    pinkMedium: 'rgba(227, 188, 181, 0.3)',
    tan: 'rgba(166, 123, 91, 0.3)',
    tanLight: 'rgba(166, 123, 91, 0.22)',
    tanMedium: 'rgba(166, 123, 91, 0.5)',
  },
  // Text colors
  text: {
    primary: '#8D5241',
    secondary: '#A67B5B',
    dark: '#373737',
    light: '#FFF2DA',
    placeholder: 'rgba(166, 123, 91, 0.5)',
  },
  // UI colors
  ui: {
    white: '#FFFFFF',
    black: '#000000',
    border: 'rgba(0, 0, 0, 0.12)',
    shadow: 'rgba(141, 82, 65, 0.1)',
    shadowDark: 'rgba(141, 82, 65, 0.2)',
  },
  // Status colors
  status: {
    online: '#22C55E',
  },
} as const;

export const fonts = {
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  abhaya: {
    regular: 'AbhayaLibre_400Regular',
    medium: 'AbhayaLibre_500Medium',
    semibold: 'AbhayaLibre_600SemiBold',
    bold: 'AbhayaLibre_700Bold',
    extrabold: 'AbhayaLibre_800ExtraBold',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const borderRadius = {
  sm: 7,
  md: 12,
  lg: 20,
  xl: 30,
  '2xl': 35,
  '3xl': 40,
  '4xl': 44,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: colors.ui.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.primary.brown,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.primary.brown,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
} as const;
