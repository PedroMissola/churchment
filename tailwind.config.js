import { mtConfig } from "@material-tailwind/react";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [
    mtConfig({
      radius: "1.5rem",
      fonts: {
        sans: "Inter",
        mono: "Fira Code",
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#262626",
        surface: {
          default: "#F5F5F5",
          dark: "#0A0A0A",
          light: "#FAFAFA",
          foreground: "#111111",
        },
        primary: {
          default: "#111111",
          dark: "#0A0A0A",
          light: "#262626",
          foreground: "#FAFAFA",
        },
        secondary: {
          default: "#FF7043",
          dark: "#BF360C",
          light: "#FFEDE7",
          foreground: "#4E260E",
        },
        info: {
          default: "#9CA3AF",
          dark: "#6B7280",
          light: "#CBD5E1",
          foreground: "#111827",
        },
        success: {
          default: "#10B981",
          dark: "#059669",
          light: "#34D399",
          foreground: "#F0FDF4",
        },
        warning: {
          default: "#FBBF24",
          dark: "#D97706",
          light: "#FCD34D",
          foreground: "#1C1917",
        },
        error: {
          default: "#EF4444",
          dark: "#DC2626",
          light: "#F87171",
          foreground: "#FEE2E2",
        },
      },
      darkColors: {
        background: "#0A0A0A",
        foreground: "#E5E5E5",
        surface: {
          default: "#1C1C1C",
          dark: "#FFFFFF",
          light: "#111827",
          foreground: "#D1D5DB",
        },
        primary: {
          default: "#F5F5F5",
          dark: "#E5E7EB",
          light: "#FAFAFA",
          foreground: "#030712",
        },
        secondary: {
          default: "#FF8A65",
          dark: "#FF5722",
          light: "#FFE0B2",
          foreground: "#3E2723",
        },
        info: {
          default: "#CBD5E1",
          dark: "#9CA3AF",
          light: "#E5E7EB",
          foreground: "#0F172A",
        },
        success: {
          default: "#34D399",
          dark: "#10B981",
          light: "#6EE7B7",
          foreground: "#022C22",
        },
        warning: {
          default: "#FCD34D",
          dark: "#FBBF24",
          light: "#FEF3C7",
          foreground: "#78350F",
        },
        error: {
          default: "#F87171",
          dark: "#EF4444",
          light: "#FCA5A5",
          foreground: "#7F1D1D",
        },
      },
    }),
  ],
};

export default config;
