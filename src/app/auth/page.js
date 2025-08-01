'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from './login';
import SignupForm from './register';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-[0_4px_14px_0_rgba(0,0,0,0.5),_0_8px_16px_0_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.6),_0_12px_24px_0_rgba(0,0,0,0.5)]">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-white">
          {isLogin ? 'Login' : 'Registro'}
        </h1>
        <p className="text-center text-gray-400 mb-6">
          {isLogin ? 'Faça login na sua conta' : 'Crie sua nova conta'}
        </p>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mb-6 py-2 px-4 rounded-lg text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
        >
          {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
        </button>

        {message && (
          <div className="bg-red-900/50 text-red-300 border border-red-700/50 p-3 mb-4 rounded-lg text-sm" role="alert">
            {message}
          </div>
        )}

        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
