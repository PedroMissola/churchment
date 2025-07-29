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
        // Light Theme Colors
        background: "#FFFFFF", // White background
        foreground: "#171717", // Dark gray/almost black for foreground text
        surface: {
          default: "#F9F9F9", // Light gray for general surfaces
          dark: "#D3D3D3",    // Slightly darker light gray
          light: "#FFFFFF",    // Pure white for very light surfaces
          foreground: "#262626", // Darker gray for text on light surfaces
        },
        primary: {
          default: "#171717", // Default primary: Dark gray/almost black
          dark: "#0A0A0A",    // Even darker for hover/active states
          light: "#525252",    // Lighter shade of primary gray
          foreground: "#FAFAFA", // Light text on dark primary
        },
        secondary: {
          default: "#F4511E", // Default secondary: Orange from image
          dark: "#BF360C",    // Darker orange/red
          light: "#FF7043",    // Lighter orange (from linear gradient)
          foreground: "#FFFFFF", // White text on orange
        },
        info: {
          default: "#9CA3AF", // Tailwind gray-400
          dark: "#6B7280",    // Tailwind gray-500
          light: "#CBD5E1",   // Tailwind gray-300
          foreground: "#111827", // Tailwind gray-900
        },
        success: {
          default: "#10B981", // Tailwind emerald-500
          dark: "#059669",    // Tailwind emerald-600
          light: "#34D399",   // Tailwind emerald-400
          foreground: "#F0FDF4", // Tailwind emerald-50
        },
        warning: {
          default: "#FFCA28", // Yellow from image
          dark: "#D97706",    // Tailwind amber-700 (for a darker yellow-orange)
          light: "#FCD34D",   // Tailwind amber-300
          foreground: "#1C1917", // Tailwind neutral-800
        },
        error: {
          default: "#EF4444", // Tailwind red-500
          dark: "#DC2626",    // Tailwind red-600
          light: "#F87171",   // Tailwind red-400
          foreground: "#FEE2E2", // Tailwind red-100
        },
      },
      darkColors: {
        // Dark Theme Colors
        background: "#0A0A0A", // Dark background
        foreground: "#E5E5E5", // Light gray for foreground text
        surface: {
          default: "#1C1C1C", // Dark gray for general surfaces
          dark: "#0A0A0A",    // Even darker gray for deeper surfaces
          light: "#262626",    // Slightly lighter dark gray
          foreground: "#D1D5DB", // Light text on dark surfaces
        },
        primary: {
          default: "#F5F5F5", // Default primary: Light gray for dark theme
          dark: "#E5E7EB",    // Slightly darker light gray
          light: "#FAFAFA",    // Pure white for very light primary elements
          foreground: "#030712", // Dark text on light primary
        },
        secondary: {
          default: "#FF8A65", // Lighter orange for dark theme
          dark: "#FF5722",    // Original orange for dark theme
          light: "#FFE0B2",    // Very light orange/peach
          foreground: "#3E2723", // Dark brown/orange text on light secondary
        },
        info: {
          default: "#CBD5E1", // Tailwind gray-300
          dark: "#9CA3AF",    // Tailwind gray-400
          light: "#E5E7EB",   // Tailwind gray-200
          foreground: "#0F172A", // Tailwind slate-900
        },
        success: {
          default: "#34D399", // Tailwind emerald-400
          dark: "#10B981",    // Tailwind emerald-500
          light: "#6EE7B7",   // Tailwind emerald-300
          foreground: "#022C22", // Tailwind emerald-950
        },
        warning: {
          default: "#FCD34D", // Tailwind amber-300
          dark: "#FBBF24",    // Tailwind amber-400
          light: "#FEF3C7",   // Tailwind amber-100
          foreground: "#78350F", // Tailwind amber-900
        },
        error: {
          default: "#F87171", // Tailwind red-400
          dark: "#EF4444",    // Tailwind red-500
          light: "#FCA5A5",   // Tailwind red-300
          foreground: "#7F1D1D", // Tailwind red-900
        },
      },
    }),
  ],
};

export default config;