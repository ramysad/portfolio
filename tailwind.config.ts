import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
          quaternary: "var(--surface-quaternary)",
          elevated: "var(--surface-elevated)",
        },
        bg: {
          primary: {
            DEFAULT: "var(--bg-primary)",
            hover: "var(--bg-primary-hover)",
          },
          secondary: {
            DEFAULT: "var(--bg-secondary)",
            hover: "var(--bg-secondary-hover)",
          },
        },
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          "on-primary": "var(--text-on-primary)",
          "on-secondary": "var(--text-on-secondary)",
        },
        link: {
          DEFAULT: "var(--link-default)",
          hover: "var(--link-hover)",
          visited: "var(--link-visited)",
        },
        icon: {
          primary: "var(--icon-primary)",
          secondary: "var(--icon-secondary)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
        success: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          500: "var(--green-500)",
          900: "var(--green-900)",
        },
        danger: {
          50: "var(--red-50)",
          100: "var(--red-100)",
          500: "var(--red-500)",
          900: "var(--red-900)",
        },
        warning: {
          50: "var(--yellow-50)",
          100: "var(--yellow-100)",
          500: "var(--yellow-500)",
          900: "var(--yellow-900)",
        },
      },
      // Changed: Replaced the static array with our dynamic language variable
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
        // 3. ADDED HERE: We are explicitly telling Tailwind how to map the font-montserrat class
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        noto: ["var(--font-noto-kufi)", "sans-serif"],
      },
      fontSize: {
        tiny: ["0.75rem", { lineHeight: "1.2" }],
        small: ["1rem", { lineHeight: "1.5" }],
        h6: ["1.333rem", { lineHeight: "1.4" }],
        h5: ["1.777rem", { lineHeight: "1.3" }],
        h4: ["2.369rem", { lineHeight: "1.2" }],
        h3: ["3.157rem", { lineHeight: "1.1" }],
        h2: ["4.209rem", { lineHeight: "1.1" }],
        h1: ["5.610rem", { lineHeight: "1" }],
        "display-s": ["7.478rem", { lineHeight: "1" }],
        "display-m": ["9.969rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};
export default config;
