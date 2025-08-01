import Link from 'next/link';
import { Suspense } from 'react';
import SignupForm from '@/components/auth/registerform';
import AuthMessage from '@/components/auth/authmessage';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-primary p-4">
      <div className="w-full max-w-md rounded-xl bg-surface p-8 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] border border-surface-dark">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-primary">
          Registro
        </h1>
        <p className="text-center text-info mb-6">
          Crie sua nova conta gratuitamente
        </p>
        
        <Suspense fallback={<div className="text-center text-info">Carregando...</div>}>
            <AuthMessage />
        </Suspense>

        <SignupForm />

        <div className="text-center mt-6">
          <Link 
            href="/login" 
            className="text-sm font-semibold text-secondary hover:text-secondary-dark transition-colors duration-200"
          >
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}