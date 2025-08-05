// src/app/auth/confirm/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    const next = searchParams.get('next') ?? '/dashboard';

    console.log('Auth confirmation attempt:', { type, hasToken: !!token_hash });

    // Validação básica dos parâmetros
    if (!token_hash || !type) {
      console.warn('Missing required parameters for auth confirmation');
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Link de confirmação inválido ou expirado.');
      return NextResponse.redirect(redirectTo);
    }

    // Tipos válidos de confirmação
    const validTypes = ['signup', 'recovery', 'email_change', 'phone_change'];
    if (!validTypes.includes(type)) {
      console.warn('Invalid confirmation type:', type);
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Tipo de confirmação inválido.');
      return NextResponse.redirect(redirectTo);
    }

    const supabase = await createClient();

    // Verifica o token OTP
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      console.error('Auth confirmation error:', error.message);
      
      // Mapeia erros específicos para mensagens amigáveis
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

    // Sucesso na confirmação
    console.log('Auth confirmation successful for user:', data.user?.id);

    // Redireciona baseado no tipo de confirmação
    let successRedirectPath = next;
    let successMessage = 'E-mail confirmado com sucesso!';

    switch (type) {
      case 'signup':
        successMessage = 'Conta ativada com sucesso! Bem-vindo!';
        break;
      case 'recovery':
        successRedirectPath = '/update-password';
        successMessage = 'Agora você pode redefinir sua senha.';
        break;
      case 'email_change':
        successMessage = 'E-mail atualizado com sucesso!';
        break;
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

// Adiciona suporte para POST (caso necessário para alguns fluxos)
export async function POST(request) {
  try {
    const body = await request.json();
    const { token_hash, type } = body;

    if (!token_hash || !type) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios ausentes.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
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
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}