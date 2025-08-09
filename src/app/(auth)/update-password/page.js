'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Alert } from '@material-tailwind/react';
import { useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { updatePassword } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { ArrowLeft, Eye, EyeClosed, Lock } from 'iconoir-react';
import { z } from 'zod';

const updatePasswordSchema = z.object({
  password: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

function UpdatePasswordForm() {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setError('');

    startTransition(async () => {
      try {
        const result = await updatePassword(data);

        if (result.success) {
          const pendingUrl = `/update-password-pending?success=${encodeURIComponent(result.message)}`;
          router.push(pendingUrl);
        }
      } catch (error) {
        console.error('Update password error:', error);
        setError(error.message || 'Erro ao atualizar senha');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mensagem de Erro */}
      {error && (
        <Alert>
          <Alert.Content>{error}</Alert.Content>
          <Alert.DismissTrigger />
        </Alert>
      )}

      {/* Instruções */}
      <Alert variant="ghost">
        <Alert.Content className="mt-0.5">
          <Typography>Definir Nova Senha</Typography>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
            <Typography as="li" type="small" className="list-item">
              Mínimo de 6 caracteres
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Use uma senha única e segura
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Misture letras, números e símbolos
            </Typography>
          </ul>
        </Alert.Content>
      </Alert>

      {/* Campo Nova Senha */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="password"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Nova Senha
        </Typography>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            size="lg"
            placeholder="Digite sua nova senha"
            isError={!!errors.password}
            color={errors.password ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none pr-12"
            disabled={isPending}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            disabled={isPending}
          >
            {showPassword ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <Typography type="small" color="error">
            {errors.password.message}
          </Typography>
        )}
      </div>

      {/* Campo Confirmar Senha */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="confirmPassword"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Confirmar Nova Senha
        </Typography>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            size="lg"
            placeholder="Confirme sua nova senha"
            isError={!!errors.confirmPassword}
            color={errors.confirmPassword ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none pr-12"
            disabled={isPending}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            disabled={isPending}
          >
            {showConfirmPassword ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <Typography type="small" color="error">
            {errors.confirmPassword.message}
          </Typography>
        )}
      </div>

      {/* Indicador de Força da Senha */}
      {password && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <Typography type="small" className="text-blue-800 font-medium mb-2">
            📊 Força da Senha
          </Typography>
          <div className="space-y-2">
            <div className={`text-xs px-2 py-1 rounded ${password.length >= 6 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
              ✓ Mínimo 6 caracteres
            </div>
            <div className={`text-xs px-2 py-1 rounded ${/[A-Z]/.test(password) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
              {/[A-Z]/.test(password) ? '✓' : '○'} Letra maiúscula
            </div>
            <div className={`text-xs px-2 py-1 rounded ${/[0-9]/.test(password) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
              {/[0-9]/.test(password) ? '✓' : '○'} Número
            </div>
          </div>
        </div>
      )}

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
            <span>ATUALIZANDO...</span>
          </div>
        ) : (
          'Atualizar senha'
        )}
      </Button>

      {/* Rodapé */}
      <div className="space-y-3 flex flex-col items-center text-center">
        <Link
          href="/reset-password"
          className="text-orange-500 hover:text-orange-600 font-medium transition-colors text-sm inline-flex gap-2 items-center"
        >
          <ArrowLeft className='w-4 h-4'></ArrowLeft>
          Voltar para recuperação de senha
        </Link>
        <Link
          href="/"
          className="text-neutral-600 text-sm font-medium hover:text-neutral-800 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </form>
  );
}

function UpdatePasswordContent() {
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
              Definir Nova Senha
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Crie uma senha segura para proteger sua conta
            </Typography>
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <UpdatePasswordContent />
    </Suspense>
  );
}