'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { Input, Typography, Button, Spinner, Radio } from '@material-tailwind/react';
import { Mail, Lock } from 'iconoir-react';
import { login } from '@/app/auth/actions';

// Esquema de validação com Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      color="secondary"
      variant="solid"
      isFullWidth
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <Spinner size='sm' />
          Entrando...
        </div>
      ) : (
        'Entrar'
      )}
    </Button>
  );
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // A função onSubmit agora apenas lida com a validação do cliente antes de enviar
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    // Chama a Server Action
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          color={errors.email ? "error" : "primary"}
          className="w-full"
          {...register('email')}
        >
          <Input.Icon>
            <Mail className="h-full w-full" />
          </Input.Icon>
        </Input>
        {errors.email && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.email.message}
          </Typography>
        )}
      </div>

      {/* Input de Senha */}
      <div className="space-y-2">
        <Typography
          as="label"
          htmlFor="password"
          type="small"
          color="default"
          className="font-semibold"
        >
          Senha
        </Typography>
        <Input
          id="password"
          type="password"
          size="lg"
          placeholder="******"
          isError={!!errors.password}
          color={errors.password ? "error" : "primary"}
          className="w-full"
          {...register('password')}
        >
          <Input.Icon>
            <Lock className="h-full w-full" />
          </Input.Icon>
        </Input>
        {errors.password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.password.message}
          </Typography>
        )}
        {/* Helper text apenas quando não há erro */}
        {!errors.password && (
          <div className="flex gap-1.5 text-foreground">
            <Typography type="small">
              Use pelo menos 8 caracteres com letras e números.
            </Typography>
          </div>
        )}
      </div>

      {/* Checkbox "Lembrar de mim" */}
      <Radio color='secondary'>
        <div className="flex items-center gap-2">
          <Radio.Item id="radio-link-agree">
            <Radio.Indicator />
          </Radio.Item>
          <Typography
            as="label"
            htmlFor="radio-link-agree"
            className="flex gap-1 text-foreground"
          >
            Lembrar de mim
          </Typography>
        </div>
      </Radio>

      <SubmitButton />
    </form>
  );
}