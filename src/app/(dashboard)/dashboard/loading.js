'use client'

import { Spinner, Typography, Progress } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

// Mensagens criativas e otimizadas
const messages = [
    'Estamos buscando os melhores produtos para você...',
    'Quase pronto! Sua experiência será incrível.',
    'Otimizando a página para um carregamento super rápido...',
    'Conectando os dados com segurança e eficiência...',
    'Agradecemos a sua paciência. Já estamos finalizando!'
];

export default function Loading() {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // Muda a mensagem a cada 4 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50 gap-4" role="status" aria-live="polite">
            {/* Título escondido para SEO e acessibilidade */}
            <h1 className="sr-only">Carregando a sua página</h1>

            <div className="flex flex-col items-center space-y-6 p-8">
                <div className="relative" aria-label="Carregando">
                    <Spinner size="xxl" color="primary"/>
                </div>

                <div className="text-center space-y-3">
                    <Typography
                        variant="h6"
                        color="secondary"
                        className="font-semibold overflow-hidden whitespace-nowrap border-r-2 border-gray-800 inline-block
                       animate-typewriter-blink"
                        key={currentMessageIndex} // Chave para forçar a animação a reiniciar
                    >
                        {messages[currentMessageIndex]}
                    </Typography>

                    <div className="flex justify-center space-x-1" aria-hidden="true">
                        <div className="w-2 h-2 bg-deep-orange-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-deep-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-deep-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

                <div className="w-64" aria-label="Barra de progresso">
                    <Progress size="sm" color="primary" value={100} className="animate-pulse" />
                </div>

            </div>
        </div>
    );
}