// src/app/auth/actions.js
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // ALTERADO: Redireciona para /login em caso de erro
    return redirect('/login?message=Credenciais inválidas. Tente novamente.');
  }

  return redirect('/dashboard');
}

export async function signup(formData) {
  const headersList = await headers();
  const origin = headersList.get('origin');

  const email = formData.get('email');
  const password = formData.get('password');
  const confirm_password = formData.get('confirm_password');
  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');

  const supabase = await createClient();

  // A validação do Zod no cliente já deve pegar isso, mas é bom ter uma segurança no servidor.
  if (password !== confirm_password) {
    // ALTERADO: Redireciona para /register
    return redirect('/register?message=As senhas não coincidem.');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      },
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    // ALTERADO: Redireciona para /register com a mensagem de erro específica
    return redirect(`/register?message=Não foi possível registrar o usuário. ${error.message}`);
  }

  // ALTERADO: Redireciona para /login com uma mensagem de sucesso
  return redirect('/login?message=Verifique seu e-mail para validar a conta!');
}