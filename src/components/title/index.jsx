import { Typography } from "@material-tailwind/react";

export default function Title({
    title,
    subtitle
}) {
    // Uma forma simples de gerar um ID único para acessibilidade
    const titleId = `title-${title?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div
            className="flex flex-col gap-4 items-center justify-center text-center px-4 py-16 md:py-24"
        >
            <Typography
                type="h2"
                id={titleId}
                className="text-3xl font-bold md:text-4xl lg:text-5xl"
                color="primary"
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    type="small"
                    color="primary-light"
                >
                    {subtitle}
                </Typography>
            )}
        </div>
    )
}