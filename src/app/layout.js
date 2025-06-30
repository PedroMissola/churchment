// app/layout.js ou app/layout.jsx

import "./globals.css";
import { inter, firaCode } from "./fonts";
import { GoogleAnalyticsTracker } from "@/app/analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { siteConfig } from "@/config/metadata";

export const metadata = siteConfig;

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
    themeColor: "white",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt" className={`${inter.variable} ${firaCode.variable}`}>
            <head>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-2VRCN8LVBN"
                    strategy="afterInteractive"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2VRCN8LVBN');
            `,
                    }}
                />
            </head>
            <body>
                {/* ✅ Vercel Speed Insights */}
                <SpeedInsights />

                {/* ✅ Seu Google Analytics customizado */}
                <GoogleAnalyticsTracker />

                {children}
            </body>
        </html>
    );
}
