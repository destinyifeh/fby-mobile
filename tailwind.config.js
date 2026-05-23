/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // V1 palette (kept for reference / easy rollback)
        primary: {
          brown: "#8D5241",
          "brown-light": "#A67B5B",
          "brown-dark": "#373737",
        },
        cream: {
          DEFAULT: "#FFF2DA",
          light: "#FFFBE9",
          dark: "#FFEDCC",
          peach: "rgba(255, 242, 218, 0.74)",
        },
        accent: {
          pink: "#E3BCB5",
          "pink-light": "rgba(227, 188, 181, 0.2)",
          "pink-medium": "rgba(227, 188, 181, 0.3)",
          tan: "rgba(166, 123, 91, 0.3)",
          "tan-light": "rgba(166, 123, 91, 0.22)",
          "tan-medium": "rgba(166, 123, 91, 0.5)",
        },

        // V2 palette
        v2: {
          bg: {
            base: "#f4f0e8",        // main screen background (all screens)
            "purple-1": "#dccaf9",  // conic gradient colour 1 (analysis screens)
            "purple-2": "#e2d3f5",  // conic gradient colour 2
          },
          purple: {
            DEFAULT: "#b891f7",                  // primary accent – buttons, active nav, progress arcs
            subtle: "rgba(201,168,255,0.2)",     // score chips, callout overlays, input bg
            soft: "rgba(184,145,247,0.2)",       // improve/recommendation tags, input borders
          },
          text: {
            dark: "#1c1b22",    // headings, bold labels
            body: "#383643",    // body copy, card titles
            muted: "#565364",   // email, secondary labels, placeholder guide
            nav: "#737080",     // bottom nav bar background / inactive icons
          },
          card: {
            "cream-subtle": "rgba(255,242,218,0.3)", // menu items, help cards
            "cream-faint": "rgba(255,242,218,0.2)",  // FAQ item backgrounds
            glass: "rgba(244,240,232,0.2)",           // score / analysis content cards
            dark: "#383643",                          // QR card, action button cards
          },
          coral: {
            DEFAULT: "#ff7a6d",                   // avatar ring, icon accent
            subtle: "rgba(255,122,109,0.2)",      // avatar ring background
            "grad-1": "rgba(255,122,109,0.5)",    // history featured card gradient
            "grad-2": "rgba(255,223,220,0.5)",    // history featured card gradient
            "grad-3": "rgba(255,174,166,0.5)",    // history featured card gradient
          },
          history: {
            pink: "#ff85af",    // Full glam card accent
            yellow: "#ffebbb",  // Soft glam card accent
          },
          badge: {
            pink: "rgba(253,152,142,0.3)",       // avg score badge
            "hot-pink": "rgba(255,79,139,0.2)",  // detected look badge
          },
          tag: {
            border: "#8d5241",  // analysis tag borders (V1 brown kept in V2)
            blush: "#e3bcb5",   // contour / blush tag borders
          },
          shadow: {
            "brown-light": "rgba(141,82,65,0.06)",  // soft card drop shadows
            "brown-medium": "rgba(141,82,65,0.3)",  // profile card shadow
            dark: "rgba(28,27,34,0.1)",             // menu item shadow
            lavender: "#e9dcfe",                     // history featured card shadow
          },
          danger: "#ff4a44",       // log out / destructive action icon bg
          "edit-dark": "#1c1b22",  // profile edit circle (near-black)
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
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
