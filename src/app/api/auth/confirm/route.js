// src/app/api/auth/confirm/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const token = searchParams.get('token');          // Use 'token', não 'token_hash'
    const email = searchParams.get('email');          // Geralmente precisa do email para confirmar
    const type = searchParams.get('type');
    const next = searchParams.get('next') ?? '/dashboard';

    if (!token || !type || !email) {
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Link de confirmação inválido ou incompleto.');
      return NextResponse.redirect(redirectTo);
    }

    const validTypes = ['signup', 'recovery', 'email_change', 'phone_change'];
    if (!validTypes.includes(type)) {
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Tipo de confirmação inválido.');
      return NextResponse.redirect(redirectTo);
    }

    const supabase = await createClient();

    // Verifica o token OTP - lembre de passar email também
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token,
      email,
    });

    if (error) {
      let errorMessage = 'Erro ao confirmar e-mail.';
      const errorMsg = error.message.toLowerCase();
      if (errorMsg.includes('expired')) errorMessage = 'Link de confirmação expirado. Solicite um novo.';
      else if (errorMsg.includes('invalid')) errorMessage = 'Link de confirmação inválido.';
      else if (errorMsg.includes('already confirmed')) errorMessage = 'E-mail já confirmado.';

      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', errorMessage);
      return NextResponse.redirect(redirectTo);
    }

    let successRedirectPath = next;
    let successMessage = 'E-mail confirmado com sucesso!';

    if (type === 'signup') successMessage = 'Conta ativada com sucesso! Bem-vindo!';
    else if (type === 'recovery') {
      successRedirectPath = '/update-password';
      successMessage = 'Agora você pode redefinir sua senha.';
    } else if (type === 'email_change') {
      successMessage = 'E-mail atualizado com sucesso!';
    }

    const redirectTo = new URL(successRedirectPath, origin);
    redirectTo.searchParams.set('success', successMessage);
    return NextResponse.redirect(redirectTo);

  } catch (error) {
    console.error('Unexpected error in auth confirmation:', error);

    const redirectTo = new URL('/login', request.url);
    redirectTo.searchParams.set('error', 'Erro interno do servidor.');
    return NextResponse.redirect(redirectTo);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { token, email, type } = body;

    if (!token || !email || !type) {
      return NextResponse.json({ error: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token,
      email,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmação realizada com sucesso!',
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });

  } catch (error) {
    console.error('POST auth confirmation error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
