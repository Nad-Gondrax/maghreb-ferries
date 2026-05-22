import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102326",
        marine: "#123C46",
        petrol: "#0F5D62",
        coral: "#F26F4C",
        sand: "#F7F3EC",
        mist: "#EEF4F2"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 35, 38, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
