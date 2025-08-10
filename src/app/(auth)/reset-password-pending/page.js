// src/app/(auth)/reset-password-pending/page.js
'use client';

import { Typography, Button, Spinner, Alert } from '@material-tailwind/react';
import { useState, useTransition, useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';

export default function ResetPasswordPendingPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const successMessage = searchParams.get('success') || '';

  // Countdown para reenvio
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendReset = async () => {
    if (!email) {
      setError('Email não encontrado. Volte e tente novamente.');
      return;
    }

    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        const result = await resetPassword({ email });

        if (result.success) {
          setSuccess('Novo link de recuperação enviado!');
          setCountdown(120);
        }
      } catch (error) {
        console.error('Reset password error:', error);
        setError(error.message || 'Erro ao reenviar link');
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md">
        <div className="space-y-8">

          {/* Cabeçalho */}
          <div className="space-y-2 text-center">
            <Typography
              type="h4"
              as="h1"
              className="text-neutral-900"
            >
              Link enviado!
            </Typography>
            <Typography className="text-neutral-600" type="p">
              Enviamos um link de recuperação para {email && (<Typography type="p" className="text-neutral-600 font-medium" as="span">{email}</Typography>
              )}
            </Typography>
          </div>

          {/* Mensagem de sucesso personalizada */}
          {successMessage && (
            <Alert color="success" variant="solid">
              <Alert.Content>
                <Typography type="small">
                  {successMessage}
                </Typography>
              </Alert.Content>
              <Alert.DismissTrigger />
            </Alert>
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
              <Typography type="small" className="text-green-800">
                {success}
              </Typography>
            </div>
          )}

          {/* Instruções */}
          <Alert variant="ghost">
            <Alert.Content className="mt-0.5">
              <Typography>Como redefinir sua senha</Typography>
              <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
                <Typography as="li" type="small" className="list-item">
                  Abra sua caixa de email
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Procure por um email de Recuperação de Senha
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Clique no link Redefinir Senha
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Crie sua nova senha segura
                </Typography>
              </ul>
            </Alert.Content>
            <Alert.DismissTrigger />
          </Alert>

          {/* Aviso de expiração */}
          <Alert variant="ghost" color="warning">
            <Alert.Content className="mt-0.5">
              <Typography type="p">Link expira em 1 hora</Typography>
              <Typography type="small">
                Por segurança, o link de recuperação expira automaticamente.
                Se não conseguir usá-lo a tempo, solicite um novo.
              </Typography>
            </Alert.Content>
          </Alert>

          {/* Botão de Reenviar */}
          <Button
            onClick={handleResendReset}
            disabled={isPending || countdown > 0 || !email}
            variant="outline"
            color="primary"
            size="lg"
            className="w-full"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span>Enviando novo link...</span>
              </div>
            ) : countdown > 0 ? (
              <span>Aguarde {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} para reenviar</span>
            ) : (
              <span>Enviar novo link</span>
            )}
          </Button>

          {!email && (
            <Alert variant="solid" color="error">
              <Alert.Content>
                <Typography type="small">
                  Email não encontrado. {" "}
                  <Link href="/reset-password" className="hover:text-neutral-100 font-semibold">
                    Tente novamente
                  </Link>
                </Typography>
              </Alert.Content>
            </Alert>
          )}

          {/* Rodapé */}
          <div className="text-center space-y-3">
            <Typography className="text-neutral-600 text-sm">
              Lembrou da sua senha?{' '}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Fazer login
              </Link>
            </Typography>
            <Link
              href="/reset-password"
              className="text-neutral-600 text-sm font-medium hover:text-neutral-800 transition-colors"
            >
              Voltar para recuperação
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}