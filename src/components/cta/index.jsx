import { Button, Typography } from "@material-tailwind/react";
import AnimatedSection from "../animatedSection";

export default function Cta({
    title,
    subtitle,
    cta,
}) {
    // Uma forma simples de gerar um ID único para acessibilidade
    const titleId = `title-${title?.toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div className="bg-gradient-to-b from-[#F4511E] to-[#FF7043] py-16 md:py-24 px-4 md:px-18 flex flex-col items-center gap-16"> {/* Ajustado px-18 para responsividade */}
            <div
                className="flex flex-col gap-4 items-center justify-center text-center"
            >
                <Typography
                    type="h2"
                    id={titleId}
                    className={`text-4xl font-bold md:text-5xl lg:text-6xl text-neutral-100`}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <AnimatedSection delay={0.1}>
                    <Typography
                        type="p"
                        className={"text-neutral-200"}
                    >
                        {subtitle}
                    </Typography>
                    </AnimatedSection>
                )}
            </div>
            <AnimatedSection delay={0.2}>
            <Button size="xl" color="primary">
                {cta}
            </Button>
            </AnimatedSection>
        </div>
    )
}