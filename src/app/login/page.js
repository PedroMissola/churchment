import Link from 'next/link';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/loginform';
import AuthMessage from '@/components/auth/authmessage';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-primary p-4">
      <div className="w-full max-w-md rounded-xl bg-surface p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] border border-surface-dark">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-primary">
          Login
        </h1>
        <p className="text-center text-info mb-6">
          Faça login na sua conta para continuar
        </p>

        {/* Suspense é necessário para que `useSearchParams` funcione no componente filho */}
        <Suspense fallback={<div className="text-center text-info">Carregando...</div>}>
          <AuthMessage />
        </Suspense>

        <LoginForm />

        <div className="text-center mt-6">
          <Link 
            href="/register" 
            className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors duration-200"
          >
            Não tem uma conta? Registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}