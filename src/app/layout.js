import "./globals.css";
import {GoogleAnalyticsTracker} from "@/app/analytics";
import Script from "next/script";

export const metadata = {
    title: "Churchment",
    description: "Generated by create next app",
};

export default function RootLayout({children}) {
    return (
        <html lang="pt">
        <head>
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
        <GoogleAnalyticsTracker />
        {children}
        </body>
        </html>
    );
}