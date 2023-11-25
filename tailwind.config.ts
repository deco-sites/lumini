import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    fontFamily: {
      "univers-next-pro-light": ["UniversNextPro-Light", "sans-serif"],
      "univers-next-pro-regular": ["UniversNextPro-Regular", "sans-serif"],
      "univers-next-pro-bold": ["UniversNextPro-Bold", "sans-serif"],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        "gray-normal": "#777",
        "lightslategray": "#8b8b8b",
        "darkslategray": "#353535",
        "ice-cube": "#f9f9f9",
        "dark-gray": "#3f3f40",
        "gainsboro": "#e0e0e0",
        "gold": "#ffc900",
        "gray": "#c9c9c9",
        "default-text": "#353535",
      },
    },
  },
};
