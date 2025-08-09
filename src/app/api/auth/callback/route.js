// src/app/api/auth/callback/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    console.log('Callback params:', { code, next, error, errorDescription });

    // Se há erro na URL (ex: usuário cancelou OAuth)
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      
      let userMessage = 'Erro na autenticação.';
      if (error === 'access_denied') {
        userMessage = 'Acesso negado. Você cancelou a autenticação.';
      } else if (error === 'server_error') {
        userMessage = 'Erro no servidor. Tente novamente.';
      } else if (error === 'temporarily_unavailable') {
        userMessage = 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.';
      }

      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', userMessage);
      return NextResponse.redirect(redirectTo);
    }

    // Se não há código, algo está errado
    if (!code) {
      console.error('No code provided in callback');
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Código de autenticação não fornecido.');
      return NextResponse.redirect(redirectTo);
    }

    const supabase = await createClient();

    // Trocar o código por uma sessão
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError);
      
      let userMessage = 'Erro ao processar autenticação.';
      const errorMsg = exchangeError.message.toLowerCase();
      
      if (errorMsg.includes('invalid_grant') || errorMsg.includes('invalid_code')) {
        userMessage = 'Código de autenticação inválido ou expirado.';
      } else if (errorMsg.includes('email not confirmed')) {
        userMessage = 'Por favor, confirme seu e-mail antes de continuar.';
      }

      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', userMessage);
      return NextResponse.redirect(redirectTo);
    }

    // Verificar se o usuário foi criado/autenticado corretamente
    if (!data.user) {
      console.error('No user in exchange response');
      const redirectTo = new URL('/login', origin);
      redirectTo.searchParams.set('error', 'Erro ao processar dados do usuário.');
      return NextResponse.redirect(redirectTo);
    }

    console.log('Successful authentication:', {
      userId: data.user.id,
      email: data.user.email,
      emailConfirmed: !!data.user.email_confirmed_at
    });

    // Verificar se é um novo usuário ou login
    const isNewUser = data.user.created_at === data.user.last_sign_in_at;
    
    // Determinar mensagem de sucesso
    let successMessage = 'Login realizado com sucesso!';
    if (isNewUser) {
      if (data.user.email_confirmed_at) {
        successMessage = 'Conta criada e ativada com sucesso! Bem-vindo!';
      } else {
        successMessage = 'Conta criada! Verifique seu e-mail para ativá-la.';
        // Para usuários não confirmados, redirecionar para página de confirmação
        const redirectTo = new URL('/verify-email', origin);
        redirectTo.searchParams.set('email', data.user.email);
        redirectTo.searchParams.set('success', successMessage);
        return NextResponse.redirect(redirectTo);
      }
    }

    // Se o usuário não confirmou o email, redirecionar para verificação
    if (!data.user.email_confirmed_at) {
      const redirectTo = new URL('/verify-email', origin);
      redirectTo.searchParams.set('email', data.user.email);
      redirectTo.searchParams.set('info', 'Por favor, confirme seu e-mail para continuar.');
      return NextResponse.redirect(redirectTo);
    }

    // Sucesso - redirecionar para destino final
    const finalDestination = next.startsWith('/') ? next : '/dashboard';
    const redirectTo = new URL(finalDestination, origin);
    redirectTo.searchParams.set('success', successMessage);
    return NextResponse.redirect(redirectTo);

  } catch (error) {
    console.error('Unexpected callback error:', error);

    const redirectTo = new URL('/login', request.url);
    redirectTo.searchParams.set('error', 'Erro interno do servidor.');
    return NextResponse.redirect(redirectTo);
  }
}

// Para casos em que podem haver POST requests (alguns provedores OAuth)
export async function POST(request) {
  try {
    // Redirecionar POST para GET com parâmetros
    const body = await request.json().catch(() => ({}));
    const { origin } = new URL(request.url);
    
    const params = new URLSearchParams();
    if (body.code) params.set('code', body.code);
    if (body.state) params.set('state', body.state);
    if (body.error) params.set('error', body.error);
    if (body.error_description) params.set('error_description', body.error_description);

    const redirectUrl = `${origin}/api/auth/callback?${params.toString()}`;
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('POST callback error:', error);
    return NextResponse.json(
      { error: 'Erro ao processar callback.' },
      { status: 500 }
    );
  }
}