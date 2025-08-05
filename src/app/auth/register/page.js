'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Checkbox } from '@material-tailwind/react';
import { Eye, EyeClosed } from 'iconoir-react';
import { useState, Suspense, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth/actions'; // ✅ Caminho corrigido
import AuthMessage from '@/components/auth/authmessage';
import { signupSchema, analyzePassword, getUserInputs } from '@/lib/utils/validations';

function PasswordStrengthIndicator({ password, userInputs = [] }) {
  if (!password) return null;

  const analysis = analyzePassword(password, userInputs);

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between items-center">
        <Typography type="small" className="text-neutral-600">
          Força da senha: <span style={{ color: analysis.color }}>{analysis.strength}</span>
        </Typography>
        <Typography type="small" className="text-neutral-500">
          {analysis.crackTimeDisplay}
        </Typography>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all duration-300"
          style={{
            width: `${((analysis.score + 1) / 5) * 100}%`,
            backgroundColor: analysis.color
          }}
        />
      </div>
      {analysis.feedback.warning && (
        <Typography type="small" color="error" className="mt-1">
          {analysis.feedback.warning}
        </Typography>
      )}
      {analysis.feedback.suggestions.length > 0 && (
        <Typography type="small" className="text-neutral-600 mt-1">
          💡 {analysis.feedback.suggestions[0]}
        </Typography>
      )}
    </div>
  );
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const watchedValues = watch();
  const userInputs = getUserInputs(watchedValues);

  const onSubmit = async (data) => {
    setError('');
    setSuccess('');
    
    startTransition(async () => {
      try {
        // ✅ Envia objeto JavaScript com nomes corretos
        const signupData = {
          firstName: data.first_name,  // ✅ Mapeia corretamente
          lastName: data.last_name,    // ✅ Mapeia corretamente
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm_password,
          terms: data.terms,
        };

        const result = await signup(signupData);

        if (result.success) {
          setSuccess(result.message);
          
          // Se precisar de confirmação de email
          if (result.requiresConfirmation) {
            // Redireciona para página de confirmação ou mostra mensagem
            setTimeout(() => {
              router.push('/login?message=' + encodeURIComponent('Verifique seu e-mail para ativar a conta'));
            }, 2000);
          } else {
            // Login automático realizado
            setTimeout(() => {
              router.push('/dashboard');
              router.refresh();
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Signup error:', error);
        setError(error.message || 'Erro ao criar conta');
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

      {/* Mensagem de Sucesso */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <Typography type="small" className="text-green-800">
            {success}
          </Typography>
        </div>
      )}

      {/* Inputs de Nome e Sobrenome - Lado a Lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input de Nome */}
        <div className="space-y-1">
          <Typography
            as="label"
            htmlFor="first-name"
            type="small"
            color="default"
            className="font-semibold"
          >
            Nome
          </Typography>
          <Input
            id="first-name"
            type="text"
            size="lg"
            placeholder="Seu nome"
            isError={!!errors.first_name}
            color={errors.first_name ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none"
            disabled={isPending}
            {...register('first_name')}
          />
          {errors.first_name && (
            <Typography type="small" color="error" className="mt-1 block">
              {errors.first_name.message}
            </Typography>
          )}
        </div>

        {/* Input de Sobrenome */}
        <div className="space-y-1">
          <Typography
            as="label"
            htmlFor="last-name"
            type="small"
            color="default"
            className="font-semibold"
          >
            Sobrenome
          </Typography>
          <Input
            id="last-name"
            type="text"
            size="lg"
            placeholder="Seu sobrenome"
            isError={!!errors.last_name}
            color={errors.last_name ? "error" : "default"}
            className="w-full border-neutral-200 shadow-none"
            disabled={isPending}
            {...register('last_name')}
          />
          {errors.last_name && (
            <Typography type="small" color="error" className="mt-1 block">
              {errors.last_name.message}
            </Typography>
          )}
        </div>
      </div>

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
          {...register('email')}
        />
        {errors.email && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.email.message}
          </Typography>
        )}
      </div>

      {/* Input de Senha com Indicador de Força */}
      <div className="space-y-1">
        <Typography
          as="label"
          htmlFor="password"
          type="small"
          color="default"
          className="font-semibold"
        >
          Senha
        </Typography>
        <div className="relative">
          <Input
            id="password"
            size="lg"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            isError={!!errors.password}
            color={errors.password ? "error" : "default"}
            className="w-full pr-12 border-neutral-200 shadow-none"
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

        {/* Indicador de Força da Senha */}
        <PasswordStrengthIndicator
          password={watchedValues.password}
          userInputs={userInputs}
        />

        {errors.password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.password.message}
          </Typography>
        )}
      </div>

      {/* Input de Confirmar Senha */}
      <div className="space-y-1">
        <Typography
          as="label"
          htmlFor="confirm-password"
          type="small"
          color="default"
          className="font-semibold"
        >
          Confirme a senha
        </Typography>
        <div className="relative">
          <Input
            id="confirm-password"
            size="lg"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            isError={!!errors.confirm_password}
            color={errors.confirm_password ? "error" : "default"}
            className="w-full pr-12 border-neutral-200 shadow-none"
            disabled={isPending}
            {...register('confirm_password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition-opacity z-10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            disabled={isPending}
          >
            {showConfirmPassword ? (
              <EyeClosed className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        {errors.confirm_password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.confirm_password.message}
          </Typography>
        )}
      </div>

      {/* Checkbox "Termos e Condições" */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="checkbox-link" 
            className="border-neutral-200" 
            disabled={isPending}
            {...register('terms')}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <Typography
            as="label"
            htmlFor="checkbox-link"
            className="cursor-pointer text-neutral-900 text-sm"
          >
            Eu aceito os &nbsp;
            <Typography as="a" href="#" color="primary" className="inline text-sm font-medium">
              termos e condições
            </Typography>
          </Typography>
        </div>
        {errors.terms && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.terms.message}
          </Typography>
        )}
      </div>

      {/* Security Tips */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
        <Typography type="small" className="text-neutral-800 font-medium">
          🔒 Dicas de Segurança:
        </Typography>
        <Typography type="small" className="text-neutral-700 mt-1">
          <br />
          • Crie uma senha única, usando letras, números e símbolos.
          <br />
          • Evite reutilizar senhas de outros sites ou serviços.
          <br />
          • Não faça o registro em redes Wi-Fi públicas ou não confiáveis.
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
              <span>REGISTRANDO...</span>
            </div>
          ) : (
            'CONTINUAR'
          )}
        </Button>
      </div>

    </form>
  );
}

export default function RegisterPage() {
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
                Registro
              </Typography>
              <Typography
                className="text-neutral-600 text-sm"
              >
                Crie sua nova conta gratuitamente
              </Typography>
            </div>

            <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
              <AuthMessage />
            </Suspense>

            <SignupForm />

            {/* Footer */}
            <div className="text-center space-y-1">
              <Typography className="text-neutral-600 text-sm">
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
                >
                  Faça Login
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