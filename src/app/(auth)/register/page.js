'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button, Spinner, Input, Checkbox, Alert } from '@material-tailwind/react';
import { Eye, EyeClosed } from 'iconoir-react';
import { useState, Suspense, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/auth/actions';
import AuthMessage from '@/components/auth/authmessage';
import { signupFormSchema, analyzePassword, getUserInputs } from '@/lib/utils/validations';

function PasswordStrengthIndicator({ password, userInputs = [] }) {
  if (!password) return null;

  const analysis = analyzePassword(password, userInputs);

  return (
    <div className="mt-2 space-y-2">
      <div className="flex justify-between items-center">
        <Typography type="small" className="text-neutral-600">
          Força: <span style={{ color: analysis.color }}>{analysis.strength}</span>
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
        <Typography type="small" color="error">
          {analysis.feedback.warning}
        </Typography>
      )}
      {/* {analysis.feedback.suggestions.length > 0 && (
        <Typography type="small" className="text-neutral-600">
          💡 {analysis.feedback.suggestions[0]}
        </Typography>
      )} */}
    </div>
  );
}

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
  });

  const watchedValues = watch();
  const userInputs = getUserInputs(watchedValues);

  const onSubmit = async (data) => {
    setError('');

    startTransition(async () => {
      try {
        const signupData = {
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm_password,
          terms: data.terms,
        };

        const result = await signup(signupData);

        if (result.success) {
          const verifyUrl = `/verify-email?email=${encodeURIComponent(data.email)}&success=${encodeURIComponent(result.message)}`;
          router.push(verifyUrl);
        }
      } catch (error) {
        console.error('Signup error:', error);
        setError(error.message || 'Erro ao criar conta');
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

      {/* Nome e Sobrenome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Typography
            as="label"
            htmlFor="first-name"
            type="small"
            className="font-semibold text-neutral-900"
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
            <Typography type="small" color="error">
              {errors.first_name.message}
            </Typography>
          )}
        </div>

        <div className="space-y-2">
          <Typography
            as="label"
            htmlFor="last-name"
            type="small"
            className="font-semibold text-neutral-900"
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
            <Typography type="small" color="error">
              {errors.last_name.message}
            </Typography>
          )}
        </div>
      </div>

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
          {...register('email')}
        />
        {errors.email && (
          <Typography type="small" color="error">
            {errors.email.message}
          </Typography>
        )}
      </div>

      {/* Campo Senha */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="password"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Senha
        </Typography>
        <div className="relative">
          <Input
            id="password"
            size="lg"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            isError={!!errors.password}
            color={errors.password ? "error" : "default"}
            className="w-full pr-12 border-neutral-200 shadow-none"
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

        <PasswordStrengthIndicator
          password={watchedValues.password}
          userInputs={userInputs}
        />

        {errors.password && (
          <Typography type="small" color="error">
            {errors.password.message}
          </Typography>
        )}
      </div>

      {/* Confirmar Senha */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="confirm-password"
          type="small"
          className="font-semibold text-neutral-900"
        >
          Confirme a senha
        </Typography>
        <div className="relative">
          <Input
            id="confirm-password"
            size="lg"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            isError={!!errors.confirm_password}
            color={errors.confirm_password ? "error" : "default"}
            className="w-full pr-12 border-neutral-200 shadow-none"
            disabled={isPending}
            {...register('confirm_password')}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isPending}
          >
            {showConfirmPassword ? (
              <EyeClosed className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirm_password && (
          <Typography type="small" color="error">
            {errors.confirm_password.message}
          </Typography>
        )}
      </div>

      {/* Termos e Condições */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            className="border-neutral-200 mt-0.5"
            disabled={isPending}
            {...register('terms')}
          >
            <Checkbox.Indicator />
          </Checkbox>
          <Typography
            as="label"
            htmlFor="terms"
            className="cursor-pointer text-neutral-900 text-sm flex-1"
          >
            Eu aceito os{' '}
            <Typography as="a" href="#" color="primary" className="inline font-medium">
              termos e condições
            </Typography>
          </Typography>
        </div>
        {errors.terms && (
          <Typography type="small" color="error">
            {errors.terms.message}
          </Typography>
        )}
      </div>

      {/* Dicas de Segurança */}
      <Alert variant="ghost">
        <Alert.Content className="mt-0.5">
          <Typography>Dicas de Segurança</Typography>
          <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
            <Typography as="li" type="small" className="list-item">
              Crie uma senha única, usando letras, números e símbolos
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Evite reutilizar senhas de outros sites ou serviços
            </Typography>
            <Typography as="li" type="small" className="list-item">
              Não faça o registro em redes Wi-Fi públicas
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
            <span>Registrando...</span>
          </div>
        ) : (
          'Continuar'
        )}
      </Button>
    </form>
  );
}

export default function RegisterPage() {
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
              Registro
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Crie sua nova conta gratuitamente
            </Typography>
          </div>

          <Suspense fallback={<div className="text-center text-neutral-400">Carregando...</div>}>
            <AuthMessage />
          </Suspense>

          <SignupForm />

          {/* Rodapé */}
          <div className="text-center space-y-3">
            <Typography className="text-neutral-600 text-sm">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Faça Login
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