import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        l: ["NanumSquareRoundOTFL"],
        r: ["NanumSquareRoundOTFR"],
        b: ["NanumSquareRoundOTFB"],
        eb: ["NanumSquareRoundOTEB"],
        nico: ["NicoMoji-Regular"],
      },
      colors: {
        gray: {
          primary: "var(--primaryGray)",
          box: "var(--boxGray)",
          boxText: "var(--textGray)",
        },
        orange: "var(--orange)",
        red: "var(--red)",
        blue: "var(--blue)",
        green: "var(--green)",
      },
    },
  },
  plugins: [],
};
export default config;
