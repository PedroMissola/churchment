'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Checkbox } from '@material-tailwind/react';
import { useState, useTransition } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth/actions'; // ✅ Caminho corrigido
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Verifica email descartável em tempo real
  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (email && email.includes('@') && isDisposableEmail(email)) {
      setEmailWarning('⚠️ Este parece ser um email temporário');
    } else {
      setEmailWarning('');
    }
  };

  const onSubmit = async (data) => {
    setError('');
    
    startTransition(async () => {
      try {
        // ✅ Envia objeto JavaScript, não FormData
        const result = await login(data);

        if (result.success) {
          router.push('/dashboard');
          router.refresh(); // Atualiza Server Components
        }
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Erro ao fazer login');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Mensagem de Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <Typography type="small" className="text-red-800">
            {error}
          </Typography>
        </div>
      )}

      {/* Input de Email */}
      <div className="space-y-1">
        <Typography
          as="label"
          htmlFor="email"
          type="small"
          color="default"
          className="font-semibold"
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
          {...register('email', {
            onChange: handleEmailChange
          })}
        />
        {emailWarning && (
          <Typography type="small" className="text-amber-600 mt-1 block">
            {emailWarning}
          </Typography>
        )}
        {errors.email && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.email.message}
          </Typography>
        )}
      </div>

      {/* Input de Senha */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Typography
            as="label"
            htmlFor="password"
            type="small"
            color="default"
            className="font-semibold"
          >
            Senha
          </Typography>
          <Link
            href="/forgot-password"
            className="text-neutral-500 hover:text-neutral-600 text-sm font-medium transition-colors duration-200"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            size="lg"
            isError={!!errors.password}
            color={errors.password ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none pr-12"
            disabled={isPending}
            {...register('password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity z-10"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            disabled={isPending}
          >
            {showPassword ? (
              <EyeClosed className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.password.message}
          </Typography>
        )}
      </div>

      {/* Checkbox "Lembrar de mim" */}
      <div className="flex gap-2">
        <Checkbox 
          id="checkbox-description" 
          className='border-neutral-200'
          disabled={isPending}
          {...register('rememberMe')}
        >
          <Checkbox.Indicator />
        </Checkbox>
        <label
          htmlFor="checkbox-description"
          className="-translate-y-0.5 cursor-pointer"
        >
          <Typography className="font-medium text-sm">Lembrar de mim</Typography>
          <Typography type="small" className="text-neutral-600">
            Você poderá fazer login sem senha por 24 horas.
          </Typography>
        </label>
      </div>

      {/* Security Tips */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
        <Typography type="small" className="text-neutral-800 font-medium">
          🔒 Dicas de Segurança:
        </Typography>
        <Typography type="small" className="text-neutral-700 mt-1">
          <br />
          • Evite compartilhar a sua senha
          <br />
          • Não faça login em redes WiFi públicas
          <br />
          • Saia da conta ao usar computadores compartilhados
        </Typography>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-orange-300"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner size='sm' className="text-white" />
              <span>ENTRANDO...</span>
            </div>
          ) : (
            'CONTINUAR'
          )}
        </Button>
      </div>

    </form>
  );
}

export default function LoginPage() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md mx-auto">

          <div className="space-y-8">

            {/* Header */}
            <div className="space-y-2">
              <Typography
                type="h1"
                className="text-neutral-900 font-semibold lg:text-2xl"
              >
                Login
              </Typography>
              <Typography
                className="text-neutral-600 text-sm"
              >
                Para entrar na plataforma faça o login na sua conta.
              </Typography>
            </div>

            <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
              <AuthMessage />
            </Suspense>

            <LoginForm />

            {/* Footer */}
            <div className="text-center space-y-1">
              <Typography className="text-neutral-600 text-sm">
                Não tem uma conta?{' '}
                <Link
                  href="/register"
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  Registre-se
                </Link>
              </Typography>
              <Typography className="text-neutral-600 text-sm flex justify-center gap-2 font-medium">
                <Link href="/">
                  Voltar para o inicio
                </Link>
              </Typography>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}