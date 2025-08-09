'use client'

import { Typography, Button, Spinner, Alert } from '@material-tailwind/react';
import { useState, useTransition, useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { Clock, CheckCircle, RefreshDouble } from 'iconoir-react';

function ResetPasswordPendingContent() {
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
          
          {/* Cabeçalho com ícone */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 p-4 rounded-full">
                <Clock className="h-12 w-12 text-orange-600" />
              </div>
            </div>
            <Typography
              type="h4"
              as="h1"
              className="text-neutral-900"
            >
              Link enviado!
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Enviamos um link de recuperação para:
            </Typography>
            {email && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
                <Typography className="text-orange-800 font-medium text-sm break-all">
                  {email}
                </Typography>
              </div>
            )}
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          {/* Mensagem de sucesso personalizada */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <Typography type="small" className="text-green-800">
                {successMessage}
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
          </Alert>

          {/* Aviso de expiração */}
          <Alert variant="ghost" className="bg-amber-50 border-amber-200">
            <Alert.Content className="mt-0.5">
              <Typography className="text-amber-800">Link expira em 1 hora</Typography>
              <Typography type="small" className="text-amber-700 mt-1">
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
            isFullWidth
            size="lg"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <span>Enviando novo link...</span>
              </div>
            ) : countdown > 0 ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshDouble className="h-4 w-4" />
                <span>Aguarde {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')} para reenviar</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <RefreshDouble className="h-4 w-4" />
                <span>Enviar novo link</span>
              </div>
            )}
          </Button>

          {!email && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <Typography type="small" className="text-red-800">
                Email não encontrado. 
                <Link href="/reset-password" className="text-orange-500 hover:text-orange-600 font-medium ml-1">
                  Tente novamente
                </Link>
              </Typography>
            </div>
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