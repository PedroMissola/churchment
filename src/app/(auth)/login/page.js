'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Checkbox, Alert } from '@material-tailwind/react';
import { useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { Eye, EyeClosed } from 'iconoir-react';
import { loginSchema, isDisposableEmail } from '@/lib/utils/validations';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
        const result = await login(data);
        if (result.success) {
          router.push('/dashboard');
          router.refresh();
        }
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Erro ao fazer login');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mensagem de Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <Typography type="small" className="text-red-800">
            {error}
          </Typography>
        </div>
      )}

      {/* Campo Email */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="email"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Email
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
      </div>

      {/* Campo Senha */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Typography
            as="label"
            htmlFor="password"
            type="small"
            className="font-semibold text-neutral-900"
          >
            Senha
          </Typography>
          <Link
            href="/reset-password"
            className="text-neutral-500 hover:text-neutral-700 text-sm font-medium transition-colors"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            size="lg"
            isError={!!errors.password}
            color={errors.password ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none pr-12"
            disabled={isPending}
            {...register('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
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

      {/* Lembrar de mim */}
      <div className="flex items-start gap-3">
        <Checkbox 
          id="remember"
          className="border-neutral-200"
          disabled={isPending}
          {...register('rememberMe')}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <div className="flex-1">
          <label htmlFor="remember" className="cursor-pointer">
            <Typography className="font-medium text-sm text-neutral-900">
              Lembrar de mim
            </Typography>
            <Typography type="small" className="text-neutral-600">
              Você poderá fazer login sem senha por 24 horas
            </Typography>
          </label>
        </div>
      </div>

      {/* Dicas de Segurança */}
      <Alert variant="ghost">
        <Alert.Content className="mt-0.5">
          <Typography>Dicas de Segurança</Typography>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
            <Typography as="li" type="small" className="list-item">
              Evite compartilhar sua senha
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Não faça login em redes WiFi públicas
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Saia da conta ao usar computadores compartilhados
            </Typography>
          </ul>
        </Alert.Content>
      </Alert>

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
            <span>Entrando...</span>
          </div>
        ) : (
          'Continuar'
        )}
      </Button>
    </form>
  );
}

export default function LoginPage() {
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
              Login
            </Typography>
            <Typography className="text-neutral-600">
              Para entrar na plataforma faça o login na sua conta
            </Typography>
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          <LoginForm />

          {/* Rodapé */}
          <div className="text-center space-y-3">
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