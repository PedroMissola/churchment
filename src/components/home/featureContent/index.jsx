'use client'

import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useEffect } from 'react'; // Importe useState e useEffect

export default function FeatureCard({
    direction = "left", // 'left' ou 'right'
    title,
    description,
    buttonText = "SAIBA MAIS",
    imageUrl,
    altText,
    feature_one,
    feature_two,
    feature_three
}) {
    const isReversed = direction === "right";
    // Estado para controlar o tamanho do botão
    const [buttonSize, setButtonSize] = useState("md");

    useEffect(() => {
        // Função para atualizar o tamanho do botão com base na largura da janela
        const handleResize = () => {
            if (window.innerWidth >= 768) { // Tailwind CSS 'md' breakpoint
                setButtonSize("xl");
            } else {
                setButtonSize("md");
            }
        };

        // Define o tamanho inicial quando o componente é montado
        handleResize();

        // Adiciona o event listener para redimensionamento da janela
        window.addEventListener("resize", handleResize);

        // Limpa o event listener quando o componente é desmontado
        return () => window.removeEventListener("resize", handleResize);
    }, []); // O array de dependências vazio garante que o efeito rode apenas uma vez na montagem

    return (
        <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 py-6 md:py-24 items-center`}>
            <div className="w-full md:w-1/2">
                <Image
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-auto rounded-lg object-cover"
                    width={600}
                    height={400}
                />
            </div>

            <div className={`w-full md:w-1/2 flex flex-col gap-4 md:gap-8 ${isReversed ? "md:items-end" : ""}`}>
                {/* Título: 24px em mobile, tamanho original em desktop */}
                <Typography variant="h3" className={`text-2xl md:text-4xl font-semibold text-secondary-dark ${isReversed ? "md:text-right" : ""} text-left`}>
                    {title}
                </Typography>
                {/* Descrição: 14px em mobile, tamanho original em desktop */}
                <Typography
                    type="p"
                    className={`text-sm text-neutral-800 md:text-base ${isReversed ? "md:text-right" : ""} text-left`}
                >
                    {description}
                </Typography>
                {/* Features: 12px em mobile, tamanho original em desktop */}
                <div className={`flex flex-wrap md:flex-row gap-2 md:gap-4 ${isReversed ? "md:justify-end" : ""} text-left md:text-left`}>
                    {feature_one && (
                        <Typography
                            className={`text-xs md:text-sm text-primary-dark ${isReversed ? "md:text-right" : ""} text-left`}
                        >
                            {feature_one}
                        </Typography>
                    )}

                    {feature_two && (
                        <Typography
                            className={`text-xs md:text-sm text-primary-dark ${isReversed ? "md:text-right" : ""} text-left`}
                        >
                            {feature_two}
                        </Typography>
                    )}

                    {feature_three && (
                        <Typography
                            className={`text-xs md:text-sm text-primary-dark ${isReversed ? "md:text-right" : ""} text-left`}
                        >
                            {feature_three}
                        </Typography>
                    )}
                </div>

                <Button
                    className={`w-fit uppercase self-start bg-surface-dark border-surface-dark hover:bg-neutral-700 hover:border-neutral-700 ${isReversed ? "md:self-end" : ""}`}
                    color="secondary"
                    size={buttonSize} // Usa o estado para definir o tamanho do botão
                >
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}