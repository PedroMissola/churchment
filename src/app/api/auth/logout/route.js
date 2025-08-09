// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    const supabase = await createClient();

    // Fazer logout no Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return NextResponse.json(
        { error: 'Erro ao fazer logout.' },
        { status: 400 }
      );
    }

    // Sucesso - retorna resposta JSON
    return NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso.',
    });

  } catch (error) {
    console.error('Unexpected logout error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { origin } = new URL(request.url);
    const supabase = await createClient();

    // Fazer logout no Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      const redirectTo = new URL('/dashboard', origin);
      redirectTo.searchParams.set('error', 'Erro ao fazer logout.');
      return NextResponse.redirect(redirectTo);
    }

    // Sucesso - redireciona para página inicial com mensagem
    const redirectTo = new URL('/', origin);
    redirectTo.searchParams.set('success', 'Logout realizado com sucesso.');
    return NextResponse.redirect(redirectTo);

  } catch (error) {
    console.error('Unexpected logout error:', error);
    const redirectTo = new URL('/', request.url);
    redirectTo.searchParams.set('error', 'Erro interno do servidor.');
    return NextResponse.redirect(redirectTo);
  }
}