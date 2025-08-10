// src/app/api/auth/confirm/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const next = searchParams.get('next') ?? '/dashboard';
    const email = searchParams.get('email');

    console.log('Auth confirm params:', { token_hash, token, type, email });

    const supabase = await createClient();

    // RECOVERY usa token_hash e exchangeCodeForSession
    if (type === 'recovery') {
      if (!token_hash) {
        const redirectTo = new URL('/reset-password', origin);
        redirectTo.searchParams.set('error', 'Link de recuperação inválido.');
        return NextResponse.redirect(redirectTo);
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(token_hash);

      if (error) {
        console.error('Recovery error:', error);
        let errorMessage = 'Erro ao processar link de recuperação.';
        const errorMsg = error.message.toLowerCase();
        
        if (errorMsg.includes('expired')) {
          errorMessage = 'Link de recuperação expirado. Solicite um novo.';
        } else if (errorMsg.includes('invalid')) {
          errorMessage = 'Link de recuperação inválido.';
        }

        const redirectTo = new URL('/reset-password', origin);
        redirectTo.searchParams.set('error', errorMessage);
        return NextResponse.redirect(redirectTo);
      }

      // Sucesso - redireciona para página de atualização de senha
      const redirectTo = new URL('/update-password', origin);
      redirectTo.searchParams.set('success', 'Agora você pode definir sua nova senha.');
      return NextResponse.redirect(redirectTo);
    }

    // SIGNUP, EMAIL_CHANGE etc. usam token e verifyOtp
    if (!token || !type || !email) {
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Link de confirmação inválido ou incompleto.');
      return NextResponse.redirect(redirectTo);
    }

    const validTypes = ['signup', 'email_change', 'phone_change'];
    if (!validTypes.includes(type)) {
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Tipo de confirmação inválido.');
      return NextResponse.redirect(redirectTo);
    }

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token,
      email,
    });

    if (error) {
      console.error('Verify OTP error:', error);
      let errorMessage = 'Erro ao confirmar e-mail.';
      const errorMsg = error.message.toLowerCase();
      
      if (errorMsg.includes('expired')) {
        errorMessage = 'Link de confirmação expirado. Solicite um novo.';
      } else if (errorMsg.includes('invalid')) {
        errorMessage = 'Link de confirmação inválido.';
      } else if (errorMsg.includes('already confirmed')) {
        errorMessage = 'E-mail já confirmado.';
      }

      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', errorMessage);
      return NextResponse.redirect(redirectTo);
    }

    // Sucesso para signup
    let successMessage = 'E-mail confirmado com sucesso!';
    if (type === 'signup') {
      successMessage = 'Conta ativada com sucesso! Bem-vindo!';
    } else if (type === 'email_change') {
      successMessage = 'E-mail atualizado com sucesso!';
    }

    const redirectTo = new URL(next, origin);
    redirectTo.searchParams.set('success', successMessage);
    return NextResponse.redirect(redirectTo);

  } catch (error) {
    console.error('Unexpected error in auth confirmation:', error);

    const redirectTo = new URL('/login', request.url);
    redirectTo.searchParams.set('error', 'Erro interno do servidor.');
    return NextResponse.redirect(redirectTo);
  }
}