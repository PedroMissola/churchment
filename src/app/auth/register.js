'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { Input, Typography, Button } from '@material-tailwind/react';
import { User, Mail, Lock } from 'iconoir-react';
import { signup } from './actions';

// Esquema de validação com Zod
const signupSchema = z
  .object({
    first_name: z.string().min(1, { message: 'O nome é obrigatório.' }),
    last_name: z.string().min(1, { message: 'O sobrenome é obrigatório.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
    confirm_password: z.string().min(6, { message: 'Confirme sua senha.' }),
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
      className="mt-6 w-full rounded-lg bg-indigo-500 py-3 px-4 font-semibold text-white shadow-md transition-all duration-300 enabled:hover:bg-indigo-600 enabled:focus:ring-2 enabled:focus:ring-indigo-500 enabled:focus:ring-offset-2 enabled:focus:ring-offset-gray-800 disabled:bg-indigo-400"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
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
    
    // Chama a Server Action
    await signup(formData);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-1">
          Nome
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User className="h-5 w-5" />
          </div>
          <Input
            id="first-name"
            type="text"
            placeholder="Seu nome"
            isError={Boolean(errors.first_name)}
            color={errors.first_name ? 'error' : 'default'}
            className="w-full pl-10"
            {...register('first_name')}
          />
        </div>
        {errors.first_name && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.first_name.message}
          </Typography>
        )}
      </div>

      <div>
        <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-1">
          Sobrenome
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <User className="h-5 w-5" />
          </div>
          <Input
            id="last-name"
            type="text"
            placeholder="Seu sobrenome"
            isError={Boolean(errors.last_name)}
            color={errors.last_name ? 'error' : 'default'}
            className="w-full pl-10"
            {...register('last_name')}
          />
        </div>
        {errors.last_name && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.last_name.message}
          </Typography>
        )}
      </div>

      <div>
        <label htmlFor="email-signup" className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            id="email-signup"
            type="email"
            placeholder="seu@email.com"
            isError={Boolean(errors.email)}
            color={errors.email ? 'error' : 'default'}
            className="w-full pl-10"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.email.message}
          </Typography>
        )}
      </div>
      
      <div>
        <label htmlFor="password-signup" className="block text-sm font-medium text-gray-300 mb-1">
          Senha
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="password-signup"
            type="password"
            placeholder="******"
            isError={Boolean(errors.password)}
            color={errors.password ? 'error' : 'default'}
            className="w-full pl-10"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.password.message}
          </Typography>
        )}
      </div>
      
      <div>
        <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-300 mb-1">
          Confirme a Senha
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="confirm-password-signup"
            type="password"
            placeholder="******"
            isError={Boolean(errors.confirm_password)}
            color={errors.confirm_password ? 'error' : 'default'}
            className="w-full pl-10"
            {...register('confirm_password')}
          />
        </div>
        {errors.confirm_password && (
          <Typography type="small" color="error" className="mt-1 block">
            {errors.confirm_password.message}
          </Typography>
        )}
      </div>
      
      <SubmitButton />
    </form>
  );
}
