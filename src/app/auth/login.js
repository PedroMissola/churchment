// src/app/auth/login-form.js
'use client';

// Importe as Server Actions do arquivo actions.js
import { login } from './actions';
import { Button, Input, Typography } from '@material-tailwind/react';
import { Mail, Lock } from 'iconoir-react';
import { useFormStatus } from 'react-dom'; // Novo hook para estado de loading

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
          <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">...</svg>
          Entrando...
        </div>
      ) : (
        'Entrar'
      )}
    </Button>
  );
}

export default function LoginForm() {
  return (
    // O formulário agora chama a Server Action diretamente
    <form action={login} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <Input id="email" name="email" type="email" placeholder="seu@email.com" required className="w-full pl-10" />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Senha</label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input id="password" name="password" type="password" placeholder="******" required className="w-full pl-10" />
        </div>
      </div>
      
      <SubmitButton />
    </form>
  );
}