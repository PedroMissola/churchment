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
        // Light Theme Colors - usando apenas NEUTRAL palette
        background: "#FFFFFF", // White background
        foreground: "#1C1917", // Neutral-800 for main text
        surface: {
          default: "#FAFAF9", // Neutral-50 for cards and surfaces
          dark: "#0C0A09",    // Neutral-900 for footer and dark sections
          light: "#FFFFFF",   // Pure white for elevated surfaces
          foreground: "#44403C", // Neutral-700 for text on surfaces
        },
        primary: {
          default: "#F97316", // Orange-500 (principal do protótipo)
          dark: "#EA580C",    // Orange-600 for hover states
          light: "#FB923C",   // Orange-400 for lighter variants
          foreground: "#FFFFFF", // White text on orange
        },
        secondary: {
          default: "#737373", // Neutral-500 for secondary elements
          dark: "#171717",    // Neutral-900 for dark secondary (footer, etc)
          light: "#A3A3A3",   // Neutral-400 for lighter secondary
          foreground: "#FFFFFF", // White text on secondary
        },
        info: {
          default: "#3B82F6", // Blue-500
          dark: "#2563EB",    // Blue-600
          light: "#60A5FA",   // Blue-400
          foreground: "#FFFFFF", // White text on blue
        },
        success: {
          default: "#10B981", // Emerald-500
          dark: "#059669",    // Emerald-600
          light: "#34D399",   // Emerald-400
          foreground: "#FFFFFF", // White text on green
        },
        warning: {
          default: "#F59E0B", // Amber-500
          dark: "#D97706",    // Amber-600
          light: "#FBBF24",   // Amber-400
          foreground: "#FFFFFF", // White text on amber
        },
        error: {
          default: "#EF4444", // Red-500
          dark: "#DC2626",    // Red-600
          light: "#F87171",   // Red-400
          foreground: "#FFFFFF", // White text on red
        },
      },
      darkColors: {
        // Dark Theme Colors - usando apenas NEUTRAL palette
        background: "#0C0A09", // Neutral-900 dark background
        foreground: "#FAFAF9", // Neutral-50 for text in dark mode
        surface: {
          default: "#1C1917", // Neutral-800 for surfaces in dark
          dark: "#0A0A0A",    // Neutral-950 for deepest surfaces
          light: "#44403C",   // Neutral-700 for elevated surfaces
          foreground: "#E7E5E4", // Neutral-200 for text on dark surfaces
        },
        primary: {
          default: "#FB923C", // Orange-400 (more vibrant for dark theme)
          dark: "#F97316",    // Orange-500 for active states
          light: "#FDBA74",   // Orange-300 for lighter variants
          foreground: "#0C0A09", // Neutral-900 text on light orange
        },
        secondary: {
          default: "#A3A3A3", // Neutral-400 for secondary in dark
          dark: "#0A0A0A",    // Neutral-950 for darkest secondary elements
          light: "#D4D4D4",   // Neutral-300 for lighter secondary
          foreground: "#0C0A09", // Neutral-900 text on light secondary
        },
        info: {
          default: "#60A5FA", // Blue-400
          dark: "#3B82F6",    // Blue-500
          light: "#93C5FD",   // Blue-300
          foreground: "#0A0A0A", // Neutral-950 text
        },
        success: {
          default: "#34D399", // Emerald-400
          dark: "#10B981",    // Emerald-500
          light: "#6EE7B7",   // Emerald-300
          foreground: "#0A0A0A", // Neutral-950 text
        },
        warning: {
          default: "#FBBF24", // Amber-400
          dark: "#F59E0B",    // Amber-500
          light: "#FCD34D",   // Amber-300
          foreground: "#0A0A0A", // Neutral-950 text
        },
        error: {
          default: "#F87171", // Red-400
          dark: "#EF4444",    // Red-500
          light: "#FCA5A5",   // Red-300
          foreground: "#0A0A0A", // Neutral-950 text
        },
      },
    }),
  ],
};

export default config;