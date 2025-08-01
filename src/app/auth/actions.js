// src/app/auth/actions.js
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers'; // Import já deve estar aqui

// A função login permanece a mesma...
export async function login(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const supabase = await createClient(); // ⬅️ await aqui

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect('/auth?message=Credenciais inválidas. Tente novamente.');
  }

  return redirect('/dashboard');
}

export async function signup(formData) {
  const headersList = await headers(); // ✅ await aqui
  const origin = headersList.get('origin');

  const email = formData.get('email');
  const password = formData.get('password');
  const confirm_password = formData.get('confirm_password');
  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');

  const supabase = await createClient(); // ✅ await aqui também

  if (password !== confirm_password) {
    return redirect('/auth?message=As senhas não coincidem.');
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
    return redirect(`/auth?message=Não foi possível registrar o usuário. ${error.message}`);
  }

  return redirect('/auth?message=Verifique seu e-mail para validar a conta!');
}