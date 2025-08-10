// src/middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();

  // Verifica se está em ambiente de desenvolvimento
  const isDevelopment = process.env.NODE_ENV === 'development';

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Sempre atualiza a sessão (necessário para SSR)
  const { data: { session }, error } = await supabase.auth.getSession();

  // Se está em desenvolvimento, pula todas as proteções
  if (isDevelopment) {
    return response;
  }

  // Define as rotas que precisam de proteção
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];
  const authRoutes = ['/login', '/register', '/reset-password', '/verify-email'];
  const pendingRoutes = ['/reset-password-pending', '/update-password-pending', '/verify-email'];

  // Verifica se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  // Verifica se é uma rota de autenticação
  const isAuthRoute = authRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  // Verifica se é uma rota de espera/pendência
  const isPendingRoute = pendingRoutes.some(route => 
    url.pathname.startsWith(route)
  );

  // Se não há sessão e está tentando acessar rota protegida
  if (!session && isProtectedRoute) {
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Se há sessão e está tentando acessar rotas de auth
  if (session && isAuthRoute && !isPendingRoute) {
    // Usuário logado tentando acessar login/register
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Validações específicas para rotas de pendência
  if (isPendingRoute) {
    // Para reset-password-pending: precisa ter email nos params
    if (url.pathname.startsWith('/reset-password-pending')) {
      const email = url.searchParams.get('email');
      if (!email) {
        url.pathname = '/reset-password';
        return NextResponse.redirect(url);
      }
    }

    // Para update-password-pending: usuário deve estar logado
    if (url.pathname.startsWith('/update-password-pending')) {
      if (!session) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }

    // Para verify-email: precisa ter email nos params
    if (url.pathname.startsWith('/verify-email')) {
      const email = url.searchParams.get('email');
      if (!email) {
        url.pathname = '/register';
        return NextResponse.redirect(url);
      }
    }
  }

  // Verificação adicional: usuário logado mas email não verificado
  if (session && session.user && !session.user.email_confirmed_at) {
    // Se não está numa rota de verificação, redireciona
    if (!url.pathname.startsWith('/verify-email') && 
        !url.pathname.startsWith('/logout')) {
      url.pathname = '/verify-email';
      url.searchParams.set('email', session.user.email);
      url.searchParams.set('info', 'Você precisa verificar seu email antes de continuar.');
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};