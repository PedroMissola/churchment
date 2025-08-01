// src/app/auth/confirm/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/dashboard';

  // ALTERADO: A rota de fallback agora é /login
  const redirectTo = new URL('/login', request.url);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectTo.pathname = next;
      return NextResponse.redirect(redirectTo);
    }

    console.error('Auth Confirmation Error:', error.message);
    // ALTERADO: Redireciona para /login com a mensagem de erro
    redirectTo.searchParams.set('message', `Erro ao confirmar e-mail: ${error.message}`);
    return NextResponse.redirect(redirectTo);
  }

  // ALTERADO: Redireciona para /login se o link for inválido
  redirectTo.searchParams.set('message', 'Link de confirmação inválido ou expirado.');
  return NextResponse.redirect(redirectTo);
}