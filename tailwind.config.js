import { mtConfig } from "@material-tailwind/react";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { 'border-color': 'transparent' },
        },
      },
      animation: {
        typewriter: 'typewriter 2s steps(30, end) forwards',
        'typewriter-blink': 'typewriter 2s steps(30, end) forwards, blink 0.8s step-end infinite',
      },
    },
  },
  plugins: [
    mtConfig(
      {
        radius: "1.5rem",
        fonts: {
          sans: "Inter",
          mono: "Fira Code"
        },
        colors: {
          background: "#FFFFFF",
          foreground: "#4B5563",
          surface: {
            default: "#E5E7EB",
            dark: "#030712",
            light: "#F9FaFB",
            foreground: "#1F2937"
          },
          primary: {
            default: "#111827",
            dark: "#030712",
            light: "#1F2937",
            foreground: "#F9FAFB"
          },
          secondary: {
            default: "#E5E7EB",
            dark: "#D1D5DB",
            light: "#F9FAFB",
            foreground: "#030712"
          },
          info: {
            default: "#2563EB",
            dark: "#1D4ED8",
            light: "#3B82F6",
            foreground: "#F9FAFB"
          },
          success: {
            default: "#16A34A",
            dark: "#15803D",
            light: "#22C55E",
            foreground: "#F9FAFB"
          },
          warning: {
            default: "#EAB308",
            dark: "#CA8A04",
            light: "#FACC15",
            foreground: "#030712"
          },
          error: {
            default: "#DC2626",
            dark: "#B91C1C",
            light: "#EF4444",
            foreground: "#F9FAFB"
          },
        },
        darkColors: {
          background: "#030712",
          foreground: "#9CA3AF",
          surface: {
            default: "#1F2937",
            dark: "#F9FAFB",
            light: "#111827",
            foreground: "#E5E7EB"
          },
          primary: {
            default: "#F3F4F6",
            dark: "#E5E7EB",
            light: "#F9FAFB",
            foreground: "#030712"
          },
          secondary: {
            default: "#1F2937",
            dark: "#111827",
            light: "#374151",
            foreground: "#F9FAFB"
          },
          info: {
            default: "#3B82F6",
            dark: "#60A5FA",
            light: "#2563EB",
            foreground: "#030712"
          },
          success: {
            default: "#22C55E",
            dark: "#16A34A",
            light: "#4ADE80",
            foreground: "#030712"
          },
          warning: {
            default: "#FACC15",
            dark: "#EABC08",
            light: "#FDE047",
            foreground: "#030712"
          },
          error: {
            default: "#EF4444",
            dark: "#DC2626",
            light: "#F87171",
            foreground: "#030712"
          },
        }
      }),
  ],
};

export default config;