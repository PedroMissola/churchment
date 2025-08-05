'use client';

import React, { useEffect } from 'react';
import { Typography, Card, Alert } from '@material-tailwind/react';
import {
    WarningTriangle,
    Bug,
    WarningCircle
} from 'iconoir-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log do erro para monitoramento
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl p-8 text-center shadow-2xl">
                {/* Animated error icon */}
                <div className="relative mb-6">
                    <div className="flex justify-center">
                        <div className="relative">
                            <WarningTriangle className="h-24 w-24 text-error-dark" />
                        </div>
                    </div>
                </div>

                {/* Main error message */}
                <Typography type="h4" as="h1" className="mb-4 text-neutral-800 font-bold">
                    Algo deu errado!
                </Typography>

                <Typography type="lead" className="mb-6 text-neutral-600">
                    Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
                </Typography>

                {/* Error details (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                    <Alert
                        color="error"
                        type="solid"
                        icon={<Bug className="h-5 w-5" />}
                    >
                        <Alert.Icon>
                            <WarningCircle className="h-5 w-5"></WarningCircle>
                        </Alert.Icon>
                        <Alert.Content>
                            <Typography className="mb-1 font-bold text-left">Detalhes do erro (desenvolvimento):</Typography>
                            <Typography as="p" variant="small" className='text-left'>
                                {error.message}
                            </Typography>
                            {error.digest && (
                                <Typography as="p" variant="small" className="mt-2 text-left">
                                    Digest: {error.digest}
                                </Typography>
                            )}
                        </Alert.Content>
                        <Alert.DismissTrigger />
                    </Alert>
                )}

                {/* Help information */}
                <div className="mt-8">
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <button
                            className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                            onClick={() => window.location.reload()}
                        >
                            Recarregar página
                        </button>
                        <button
                            className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                            onClick={() => window.history.back()}
                        >
                            Voltar
                        </button>
                        <Link href="/">
                            <button
                                className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                            >
                                Inicio
                            </button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
}