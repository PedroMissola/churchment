'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Card, Alert, Button } from '@material-tailwind/react';
import {
    WarningTriangle,
    Bug,
    WarningCircle,
    InfoCircle,
    Settings,
    Copy,
    Mail
} from 'iconoir-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    const [notificationSent, setNotificationSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [debugExpanded, setDebugExpanded] = useState(false);
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);
    const [debugInfo, setDebugInfo] = useState({});

    // Função para enviar notificação de erro
    const sendErrorNotification = async (errorDetails) => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/send-error-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: errorDetails.message || 'Erro não especificado',
                    digest: errorDetails.digest || null,
                    stack: errorDetails.stack || 'Stack trace não disponível',
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            });

            const result = await response.json();

            if (result.success) {
                setNotificationSent(true);
                console.log('Notificação de erro enviada com sucesso');
            } else {
                console.error('Falha ao enviar notificação:', result.error);
            }
        } catch (notificationError) {
            console.error('Erro ao enviar notificação:', notificationError);
        } finally {
            setIsLoading(false);
        }
    };

    // Função para copiar informações de debug
    const copyDebugInfo = async () => {
        const debugText = `
ERRO NA APLICAÇÃO - DEBUG INFO

Timestamp: ${debugInfo.timestamp}
URL: ${debugInfo.url}
User Agent: ${debugInfo.userAgent}

ERRO:
Mensagem: ${error?.message || 'Não especificado'}
Digest: ${error?.digest || 'Não disponível'}

STACK TRACE:
${error?.stack || 'Não disponível'}

INFORMAÇÕES DO SISTEMA:
Plataforma: ${debugInfo.platform}
Idioma: ${debugInfo.language}
Resolução: ${debugInfo.screenResolution}
Viewport: ${debugInfo.viewport}
        `.trim();

        try {
            await navigator.clipboard.writeText(debugText);
            setCopiedToClipboard(true);
            setTimeout(() => setCopiedToClipboard(false), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    useEffect(() => {
        // Coletando informações de debug
        const collectDebugInfo = () => {
            const debugData = {
                timestamp: new Date().toLocaleString('pt-BR'),
                url: window.location.href,
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screenResolution: `${screen.width}x${screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                cookieEnabled: navigator.cookieEnabled,
                onlineStatus: navigator.onLine
            };
            setDebugInfo(debugData);
        };

        // Log do erro para monitoramento local
        console.error('Application Error:', error);
        collectDebugInfo();

        // Enviar notificação automaticamente apenas em produção
        if (process.env.NODE_ENV === 'production' && !notificationSent) {
            sendErrorNotification({
                message: error?.message,
                digest: error?.digest,
                stack: error?.stack
            });
        }
    }, [error, notificationSent]);

    const handleManualNotification = () => {
        if (!notificationSent && !isLoading) {
            sendErrorNotification({
                message: error?.message,
                digest: error?.digest,
                stack: error?.stack
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl p-8 text-center shadow-2xl">
                {/* Animated error icon */}
                <div className="relative mb-6">
                    <div className="flex justify-center">
                        <div className="relative">
                            <WarningTriangle className="h-24 w-24 text-error-dark animate-pulse" />
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

                {/* Notification status */}
                <div className="mb-4">
                    {process.env.NODE_ENV === 'production' && (
                        <div className="text-sm text-neutral-500">
                            {isLoading && (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                                    Enviando notificação...
                                </div>
                            )}
                            {notificationSent && !isLoading && (
                                <div className="text-green-600 flex items-center justify-center gap-2">
                                    ✓ Equipe técnica notificada automaticamente
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Debug Panel - Apenas em desenvolvimento */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-6 border-t border-gray-200 pt-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-blue-600" />
                                    <Typography variant="h6" className="text-blue-600 font-semibold">
                                        Painel de Debug
                                    </Typography>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        DESENVOLVIMENTO
                                    </span>
                                </div>
                                <button
                                    onClick={() => setDebugExpanded(!debugExpanded)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    {debugExpanded ? 'Recolher' : 'Expandir'}
                                </button>
                            </div>

                            {/* Botões de ação rápida */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <button
                                    onClick={handleManualNotification}
                                    disabled={isLoading || notificationSent}
                                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    {isLoading ? 'Enviando...' : notificationSent ? 'Email Enviado ✓' : 'Testar Email'}
                                </button>

                                <button
                                    onClick={copyDebugInfo}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                                >
                                    <Copy className="h-4 w-4" />
                                    {copiedToClipboard ? 'Copiado ✓' : 'Copiar Info'}
                                </button>

                                <button
                                    onClick={() => console.table(debugInfo)}
                                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                                >
                                    <InfoCircle className="h-4 w-4" />
                                    Log Console
                                </button>
                            </div>

                            {debugExpanded && (
                                <div className="space-y-4">
                                    {/* Quick Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                        <div className="bg-white p-3 rounded border">
                                            <Typography variant="small" className="font-semibold text-gray-700 mb-2">
                                                Informações do Erro
                                            </Typography>
                                            <div className="space-y-1 text-xs">
                                                <div><strong>Mensagem:</strong> {error?.message || 'N/A'}</div>
                                                <div><strong>Digest:</strong> {error?.digest || 'N/A'}</div>
                                                <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-3 rounded border">
                                            <Typography variant="small" className="font-semibold text-gray-700 mb-2">
                                                Informações do Sistema
                                            </Typography>
                                            <div className="space-y-1 text-xs">
                                                <div><strong>Plataforma:</strong> {debugInfo.platform}</div>
                                                <div><strong>Idioma:</strong> {debugInfo.language}</div>
                                                <div><strong>Viewport:</strong> {debugInfo.viewport}</div>
                                                <div><strong>Online:</strong> {debugInfo.onlineStatus ? 'Sim' : 'Não'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stack Trace Expandido */}
                                    {error?.stack && (
                                        <Alert className="text-left">
                                            <Alert.Icon>
                                                <Bug className="h-5 w-5" />
                                            </Alert.Icon>
                                            <Alert.Content>
                                                <Typography className="mb-2 font-bold">
                                                    Stack Trace Completo:
                                                </Typography>
                                                <pre className="text-xs bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto whitespace-pre-wrap">
                                                    {error.stack}
                                                </pre>
                                            </Alert.Content>
                                        </Alert>
                                    )}

                                    {/* URL e User Agent */}
                                    <div className="bg-white p-3 rounded border text-left">
                                        <Typography variant="small" className="font-semibold text-gray-700 mb-2">
                                            Contexto da Requisição
                                        </Typography>
                                        <div className="space-y-2 text-xs">
                                            <div>
                                                <strong>URL:</strong>
                                                <code className="ml-2 bg-gray-100 px-1 rounded text-xs">
                                                    {debugInfo.url}
                                                </code>
                                            </div>
                                            <div>
                                                <strong>User Agent:</strong>
                                                <div className="mt-1 bg-gray-100 p-2 rounded text-xs break-all">
                                                    {debugInfo.userAgent}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="mt-8">
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <Button
                            color="primary"
                            variant="outline"
                            size="md"
                            onClick={reset}
                        >
                            Tentar Novamente
                        </Button>

                        <Button
                            color="primary"
                            variant="outline"
                            size="md"
                            onClick={() => window.location.reload()}
                        >
                            Recarregar Página
                        </Button>

                        <Button
                            color="primary"
                            variant="outline"
                            size="md"
                            onClick={() => window.history.back()}
                        >
                            Voltar
                        </Button>

                        <Link href="/">
                            <Button
                                color="primary"
                                variant="outline"
                                size="md"
                            >
                                Ir para o Início
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Error ID for reference */}
                {error?.digest && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <Typography variant="small" className="text-gray-500">
                            ID de Referência: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{error.digest}</code>
                        </Typography>
                    </div>
                )}
            </Card>
        </div>
    );
}