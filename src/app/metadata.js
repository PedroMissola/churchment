export const siteConfig = {
    title: {
        default: "Churchment - Gestão de Igrejas Moderna e Simples",
        template: "%s | Churchment",
    },
    description: "O Churchment é uma plataforma moderna e completa para gestão de igrejas. Simplifique a gestão de eventos, escalas de voluntários, comunicação interna e finanças.",
    keywords: [
        "Churchment",
        "gestão de igrejas",
        "software para igrejas",
        "plataforma para igrejas",
        "aplicativo para igrejas",
        "gestão de membros",
        "escalas de voluntários",
        "eventos da igreja",
        "comunicação para ministérios",
        "finanças de igreja",
    ],
    authors: [
        {
            name: "Churchment",
            url: "https://churchment.vercel.app/",
        },
    ],
    creator: "Churchment",
    metadataBase: new URL("https://churchment.vercel.app/"),
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: "https://churchment.vercel.app/",
        title: "Churchment - Gestão de Igrejas Moderna e Simples",
        description: "O Churchment é uma plataforma moderna e completa para gestão de igrejas.",
        siteName: "Churchment",
        images: [
            {
                url: "/opengraph-image.png", // Relativo a metadataBase
                width: 1200,
                height: 630,
                alt: "Churchment - Plataforma de Gestão para Igrejas",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Churchment - Gestão de Igrejas Moderna e Simples",
        description: "Organize sua igreja de forma moderna com o Churchment.",
        images: ["/twitter-image.png"], // Relativo a metadataBase
        creator: "@churchment",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

