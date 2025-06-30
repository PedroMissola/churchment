import { Typography } from "@material-tailwind/react";

export default function Title({
    title,
    subtitle
}) {
    // Uma forma simples de gerar um ID único para acessibilidade
    const titleId = `title-${title?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <section
            className="flex flex-col gap-4 items-center justify-center text-center px-4 py-16 md:py-24"
            aria-labelledby={titleId}
        >
            <Typography
                as="h2"
                id={titleId}
                className="text-3xl font-bold md:text-4xl lg:text-5xl"
                color="primary"
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    as="p"
                    className="mt-2 max-w-3xl text-base md:text-lg text-foreground/80"
                >
                    {subtitle}
                </Typography>
            )}
        </section>
    )
}