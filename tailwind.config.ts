import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    fontFamily: {
      "univers-next-pro-light": ["Univers Next Pro Light", "sans-serif"],
      "univers-next-pro-regular": ["Univers Next Pro Regular", "sans-serif"],
      "univers-next-pro-bold": ["Univers Next Pro Bold", "sans-serif"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        "lightslategray": "#8b8b8b",
        "darkslategray": "#353535",
        "dark-gray": "#3f3f40",
        "gainsboro": "#e0e0e0",
        "gold": "#ffc900",
      },
    },
  },
};
