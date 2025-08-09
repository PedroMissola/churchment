// src/app/(auth)/update-password-pending/page.js
'use client';

import { Typography, Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthMessage from '@/components/auth/authmessage';
import { CheckCircle, Clock, ArrowRight } from 'iconoir-react';

function UpdatePasswordPendingContent() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const successMessage = searchParams.get('success') || 'Senha atualizada com sucesso!';

  // Countdown para redirecionamento automático
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/login');
    }
  }, [countdown, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md mx-auto">
        
        <div className="space-y-6 text-center">
          
          {/* Ícone de Sucesso */}
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          {/* Header */}
          <div className="space-y-2">
            <Typography
              type="h1"
              className="text-neutral-900 font-semibold text-xl"
            >
              Senha atualizada!
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
            </Typography>
          </div>

          {/* Mensagens da URL */}
          <Suspense fallback={null}>
            <AuthMessage />
          </Suspense>

          {/* Mensagem de sucesso personalizada */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <Typography type="small" className="text-green-800">
                {successMessage}
              </Typography>
            </div>
          )}

          {/* Contador de redirecionamento */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <Typography type="small" className="text-blue-800 font-medium">
                  Redirecionando em {countdown} segundos
                </Typography>
                <Typography type="small" className="text-blue-700 mt-1">
                  Você será levado para a página de login automaticamente
                </Typography>
              </div>
            </div>
          </div>

          {/* Dicas de segurança */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-left">
            <Typography type="small" className="text-neutral-800 font-medium">
              🔐 Dicas importantes:
            </Typography>
            <Typography type="small" className="text-neutral-700 mt-1">
              <br />
              • Sua nova senha está ativa imediatamente
              <br />
              • Use apenas dispositivos confiáveis para fazer login
              <br />
              • Não compartilhe sua senha com ninguém
              <br />
              • Considere usar um gerenciador de senhas
            </Typography>
          </div>

          {/* Botão de ação manual */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/login')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <span>IR PARA LOGIN AGORA</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>

            <Typography type="small" className="text-neutral-500">
              Ou aguarde o redirecionamento automático
            </Typography>
          </div>

          {/* Links alternativos */}
          <div className="pt-4 space-y-2">
            <Typography className="text-neutral-600 text-sm">
              Precisa de ajuda?{' '}
              <Link
                href="/support"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Entre em contato
              </Link>
            </Typography>
            
            <Typography className="text-neutral-600 text-sm">
              <Link
                href="/"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
              >
                ← Voltar para o início
              </Link>
            </Typography>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function UpdatePasswordPendingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Carregando...</div>}>
      <UpdatePasswordPendingContent />
    </Suspense>
  );
}