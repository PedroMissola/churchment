// src/app/auth/confirm/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/dashboard';

  const redirectTo = new URL('/auth', request.url);

  if (token_hash && type) {
    const supabase = await createClient(); // ✅ await aqui

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectTo.pathname = next;
      return NextResponse.redirect(redirectTo);
    }

    console.error('Auth Confirmation Error:', error.message);
    redirectTo.searchParams.set('message', `Erro ao confirmar e-mail: ${error.message}`);
    return NextResponse.redirect(redirectTo);
  }

  redirectTo.searchParams.set('message', 'Link de confirmação inválido ou expirado.');
  return NextResponse.redirect(redirectTo);
}
