import { Typography } from "@material-tailwind/react";

export default function Title({
    title,
    subtitle,
    color = "black" // Pode ser 'black' ou 'white'
}) {
    // Uma forma simples de gerar um ID único para acessibilidade
    const titleId = `title-${title?.toLowerCase().replace(/\s+/g, '-')}`;

    const titleColorClass = color === 'white' ? 'text-white' : 'text-primary';
    const subtitleColorClass = color === 'white' ? 'text-gray-200' : 'text-primary-light';

    return (
        <div
            className="flex flex-col gap-4 items-center justify-center text-center px-4 md:px-0" // Adicionado px-4 md:px-0 para responsividade
        >
            <Typography
                type="h2"
                id={titleId}
                className={`text-3xl font-bold md:text-4xl lg:text-5xl ${titleColorClass}`}
            >
                {title}
            </Typography>
            {subtitle && (
                <Typography
                    type="p"
                    color="foreground"
                    className={subtitleColorClass}
                >
                    {subtitle}
                </Typography>
            )}
        </div>
    )
}