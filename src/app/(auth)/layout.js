'use client';

import { Typography } from '@material-tailwind/react';
import AuthMessage from '@/components/auth/authmessage'; // componente para mensagens gerais (opcional)

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Conteúdo principal */}
      <main>
          {children}
      </main>
    </div>
  );
}
