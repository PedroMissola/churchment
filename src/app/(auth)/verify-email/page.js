'use client';

import { Typography, Button, Spinner, Alert } from '@material-tailwind/react';
import { useState, useTransition, useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resendConfirmation } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { Mail, CheckCircle, RefreshDouble } from 'iconoir-react';

function VerifyEmailContent() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const successMessage = searchParams.get('success') || '';
  const infoMessage = searchParams.get('info') || '';

  // Countdown para reenvio
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) {
      setError('Email não encontrado. Faça o registro novamente.');
      return;
    }

    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        const result = await resendConfirmation(email);

        if (result.success) {
          setSuccess('Email reenviado com sucesso!');
          setCountdown(60);
        }
      } catch (error) {
        console.error('Resend confirmation error:', error);
        setError(error.message || 'Erro ao reenviar email');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md">
        <div className="space-y-8">

          {/* Cabeçalho com ícone */}
          <div className="space-y-2 text-center">
            <Typography
              type="h4"
              as="h1"
              className="text-neutral-900"
            >
              Verifique seu email
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Enviamos um link de verificação para:
            </Typography>
            {email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <Typography className="text-blue-800 font-medium text-sm break-all">
                  {email}
                </Typography>
              </div>
            )}
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          {/* Mensagens personalizadas */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <Typography type="small" className="text-green-800">
                {successMessage}
              </Typography>
            </div>
          )}

          {infoMessage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <Typography type="small" className="text-blue-800">
                {infoMessage}
              </Typography>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <Typography type="small" className="text-red-800">
                {error}
              </Typography>
            </div>
          )}

          {/* Mensagem de sucesso */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <Typography type="small" className="text-green-800">
                  {success}
                </Typography>
              </div>
            </div>
          )}

          {/* Instruções */}
          <Alert variant="ghost">
            <Alert.Content className="mt-0.5">
              <Typography>O que fazer agora</Typography>
              <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
                <Typography as="li" type="small" className="list-item">
                  Abra sua caixa de email
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Procure por um email de verificação
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Clique no link Confirmar email
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Você será redirecionado automaticamente
                </Typography>
              </ul>
            </Alert.Content>
            <Alert.DismissTrigger />
          </Alert>

          {/* Dica sobre spam */}
          <Alert variant="ghost" color="warning">
            <Alert.Content>
              <Typography>Não encontrou o email?</Typography>
              <Typography type="small">
                Verifique sua pasta de spam ou lixo eletrônico.
                Às vezes emails de verificação podem ir parar lá.
              </Typography>
            </Alert.Content>
            <Alert.DismissTrigger />
          </Alert>

          {/* Botão de Reenviar */}
          <Button
            onClick={handleResendEmail}
            disabled={isPending || countdown > 0 || !email}
            variant="outline"
            color="primary"
            isFullWidth
            size="lg"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span>Reenviando...</span>
              </div>
            ) : countdown > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshDouble className="h-4 w-4" />
                <span>Aguarde {countdown}s para reenviar</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <RefreshDouble className="h-4 w-4" />
                <span>Reenviar email</span>
              </div>
            )}
          </Button>

          {!email && (
            <Alert color="error">
              <Alert.Content>
                <Typography type="small">
                  Email não encontrado.{" "}
                  <Link href="/register" className="hover:text-orange-50 font-semibold">
                    Faça o registro novamente
                  </Link>
                </Typography>
              </Alert.Content>
            </Alert>
          )}

          {/* Rodapé */}
          <div className="text-center space-y-3">
            <Typography className="text-neutral-600 text-sm">
              Já verificou seu email?{' '}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Fazer login
              </Link>
            </Typography>
            <Link
              href="/register"
              className="text-neutral-600 text-sm font-medium hover:text-neutral-800 transition-colors"
            >
              Voltar para registro
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}