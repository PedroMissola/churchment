'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { Input, Typography, Button } from '@material-tailwind/react';
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
      className="mt-6 w-full rounded-lg bg-secondary py-3 px-4 font-semibold text-white shadow-md transition-all duration-300 enabled:hover:bg-secondary-dark enabled:focus:ring-2 enabled:focus:ring-secondary enabled:focus:ring-offset-2 enabled:focus:ring-offset-white disabled:bg-secondary/60"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
          Email
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-info">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email ? true : undefined}
            className="w-full pl-10"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <Typography variant="small" color="red" className="mt-1 block">
            {errors.email.message}
          </Typography>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">
          Senha
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-info">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="******"
            error={errors.password ? true : undefined}
            className="w-full pl-10"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <Typography variant="small" color="red" className="mt-1 block">
            {errors.password.message}
          </Typography>
        )}
      </div>
      
      <SubmitButton />
    </form>
  );
}