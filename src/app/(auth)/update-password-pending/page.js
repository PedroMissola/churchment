// src/app/(auth)/update-password-pending/page.js
'use client';

import { Typography, Button, Alert } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthMessage from '@/components/auth/authmessage';

export default function UpdatePasswordPendingPage() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const searchParams = useSearchParams();

  const successMessage = searchParams.get('success') || '';

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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md">
        <div className="space-y-8">

          {/* Cabeçalho */}
          <div className="space-y-2 text-center">
            <Typography
              type="h4"
              as="h1"
              className="text-neutral-900"
            >
              Senha atualizada!
            </Typography>
            <Typography className="text-neutral-600 text-sm">
              Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
            </Typography>
          </div>

          {/* Mensagem de sucesso personalizada */}
          {successMessage && (
            <Alert color="success" variant="solid">
              <Alert.Content>
                <Typography type="small">
                  {successMessage}
                </Typography>
              </Alert.Content>
              <Alert.DismissTrigger />
            </Alert>
          )}

          {/* Contador de redirecionamento */}
          <Alert variant="ghost" color="info">
            <Alert.Content>
              <Typography>Redirecionando em {countdown} segundos</Typography>
              <Typography type="small">
                Você será levado para a página de login automaticamente
              </Typography>
            </Alert.Content>
          </Alert>

          {/* Dicas de segurança */}
          <Alert variant="ghost">
            <Alert.Content className="mt-0.5">
              <Typography>Dicas de segurança</Typography>
              <ul className="ml-2 mt-2 list-inside list-disc space-y-1">
                <Typography as="li" type="small" className="list-item">
                  Sua nova senha está ativa imediatamente
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Use apenas dispositivos confiáveis para fazer login
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Não compartilhe sua senha com ninguém
                </Typography>
                <Typography as="li" type="small" className="list-item">
                  Considere usar um gerenciador de senhas
                </Typography>
              </ul>
            </Alert.Content>
          </Alert>

          {/* Botão de ação manual */}
          <Button
            onClick={() => router.push('/login')}
            variant="solid"
            color="primary"
            size="lg"
            className="w-full"
          >
            IR PARA LOGIN AGORA
          </Button>

          {/* Rodapé */}
          <div className="text-center space-y-3">
            <Typography className="text-neutral-600 text-sm">
              Ou aguarde o redirecionamento automático
            </Typography>

            <Typography className="text-neutral-600 text-sm">
              Precisa de ajuda?{' '}
              <Link
                href="/support"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Entre em contato
              </Link>
            </Typography>

            <Link
              href="/"
              className="text-neutral-600 text-sm font-medium hover:text-neutral-800 transition-colors"
            >
              Voltar para o início
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}