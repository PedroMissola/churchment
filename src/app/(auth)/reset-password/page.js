'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Alert } from '@material-tailwind/react';
import { useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { resetPasswordSchema, isDisposableEmail } from '@/lib/utils/validations';

function ResetPasswordForm() {
  const [emailWarning, setEmailWarning] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromUrl = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromUrl
    }
  });

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (email && email.includes('@') && isDisposableEmail(email)) {
      setEmailWarning('Este parece ser um email temporário');
    } else {
      setEmailWarning('');
    }
  };

  const onSubmit = async (data) => {
    setError('');

    startTransition(async () => {
      try {
        const result = await resetPassword(data);

        if (result.success) {
          const pendingUrl = `/reset-password-pending?email=${encodeURIComponent(data.email)}&success=${encodeURIComponent(result.message)}`;
          router.push(pendingUrl);
        }
      } catch (error) {
        console.error('Reset password error:', error);
        setError(error.message || 'Erro ao enviar email de recuperação');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mensagem de Erro */}
      {error && (
        <Alert color="error" variant="solid">
          <Alert.Content>
            <Typography type="small">
              {error}
            </Typography>
          </Alert.Content>
        </Alert>
      )}

      {/* Instruções */}
      <Alert variant="ghost">
        <Alert.Content className="mt-0.5">
          <Typography>Como funciona</Typography>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
            <Typography as="li" type="small" className="list-item">
              Digite o email da sua conta
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Você receberá um link seguro por email
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Clique no link para criar uma nova senha
            </Typography>
            <Typography as="li" type="small" className="list-item">
              O link expira em 1 hora por segurança
            </Typography>
          </ul>
        </Alert.Content>
        <Alert.DismissTrigger />
      </Alert>

      {/* Campo Email */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="email"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Email da conta
        </Typography>
        <Input
          id="email"
          type="email"
          size="lg"
          placeholder="seu@email.com"
          isError={!!errors.email}
          color={errors.email ? "error" : "default"}
          className="w-full border-neutral-200 shadow-none"
          disabled={isPending}
          {...register('email', { onChange: handleEmailChange })}
        />
        {emailWarning && (
          <Typography type="small" className="text-amber-600">
            ⚠️ {emailWarning}
          </Typography>
        )}
        {errors.email && (
          <Typography type="small" color="error">
            {errors.email.message}
          </Typography>
        )}
        <Typography type="small" className="text-neutral-500">
          Digite o email que você usou para criar sua conta
        </Typography>
      </div>

      {/* Botão de Submit */}
      <Button
        type="submit"
        disabled={isPending}
        color="primary"
        isFullWidth
        size="lg"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" className="text-white" />
            <span>Enviando...</span>
          </div>
        ) : (
          'Enviar Link de Recuperação'
        )}
      </Button>
    </form>
  );
}

function ResetPasswordContent() {
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
              Recuperar Senha
            </Typography>
            <Typography className="text-neutral-600">
              Digite seu email para receber um link de recuperação de senha
            </Typography>
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          <ResetPasswordForm />

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
            <Typography className="text-neutral-600 text-sm">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Registre-se
              </Link>
            </Typography>
            <Link
              href="/"
              className="text-neutral-600 text-sm font-medium hover:text-neutral-800 transition-colors"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}