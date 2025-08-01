'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { Input, Typography, Button, Spinner, Radio } from '@material-tailwind/react';
import { User, Mail, Lock, InfoCircle } from 'iconoir-react';
import { signup } from '@/app/auth/actions';

// Esquema de validação com Zod
const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: 'O nome é obrigatório.' }),
    last_name: z.string().min(1, { message: 'O sobrenome é obrigatório.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirm_password: z.string().min(6, { message: 'Confirme sua senha.' }),
    terms: z.boolean().refine(val => val === true, {
      message: 'Você deve aceitar os termos e condições.'
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não coincidem.',
    path: ['confirm_password'],
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
          Registrando...
        </div>
      ) : (
        'Registrar'
      )}
    </Button>
  );
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  
  // A função onSubmit agora apenas lida com a validação do cliente antes de enviar
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('terms', data.terms);
    
    // Chama a Server Action
    await signup(formData);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            className="w-full"
            {...register('first_name')}
          >
            <Input.Icon>
              <User className="h-full w-full" />
            </Input.Icon>
          </Input>
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
            className="w-full"
            {...register('last_name')}
          >
            <Input.Icon>
              <User className="h-full w-full" />
            </Input.Icon>
          </Input>
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
          htmlFor="email-signup"
          type="small"
          color="default"
          className="font-semibold"
        >
          Email
        </Typography>
        <Input
          id="email-signup"
          type="email"
          size="lg"
          placeholder="seu@email.com"
          isError={!!errors.email}
          color={errors.email ? "error" : "default"}
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
          htmlFor="password-signup"
          type="small"
          color="default"
          className="font-semibold"
        >
          Senha
        </Typography>
        <Input
          id="password-signup"
          type="password"
          size="lg"
          placeholder="******"
          isError={!!errors.password}
          color={errors.password ? "error" : "default"}
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
            <InfoCircle className="h-3.5 w-3.5 shrink-0 translate-y-[3px] stroke-2" />
            <Typography type="small">
              Use pelo menos 6 caracteres com letras, números e símbolos.
            </Typography>
          </div>
        )}
      </div>
      
      {/* Input de Confirmar Senha */}
      <div className="space-y-1">
        <Typography
          as="label"
          htmlFor="confirm-password-signup"
          type="small"
          color="default"
          className="font-semibold"
        >
          Confirme a Senha
        </Typography>
        <Input
          id="confirm-password-signup"
          type="password"
          size="lg"
          placeholder="******"
          isError={!!errors.confirm_password}
          color={errors.confirm_password ? "error" : "default"}
          className="w-full"
          {...register('confirm_password')}
        >
          <Input.Icon>
            <Lock className="h-full w-full" />
          </Input.Icon>
        </Input>
        {errors.confirm_password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.confirm_password.message}
          </Typography>
        )}
      </div>

      {/* Checkbox "Termos e Condições" */}
      <div className="space-y-1">
        <Radio color='secondary'>
          <div className="flex items-start gap-2">
            <Radio.Item id="terms-agree" {...register('terms')}>
              <Radio.Indicator />
            </Radio.Item>
            <div className="flex flex-col">
              <Typography
                as="label"
                htmlFor="terms-agree"
                className="text-foreground leading-relaxed"
              >
                Eu aceito os{' '}
                <a href="/termos" className="text-secondary hover:text-secondary-dark underline">
                  Termos de Uso
                </a>{' '}
                e a{' '}
                <a href="/privacidade" className="text-secondary hover:text-secondary-dark underline">
                  Política de Privacidade
                </a>
              </Typography>
              {errors.terms && (
                <Typography type="small" color="error" className="mt-1">
                  {errors.terms.message}
                </Typography>
              )}
            </div>
          </div>
        </Radio>
      </div>
      
      <SubmitButton />
    </form>
  );
}