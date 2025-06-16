import { mtConfig } from "@material-tailwind/react";

const config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
    ],
    theme: { },
    plugins: [mtConfig],
};

export default config;

