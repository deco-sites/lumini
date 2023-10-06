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
  },
};
