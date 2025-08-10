//src/lib/auth/actions.js
'use server';

import { z } from 'zod';
import {
  loginSchema,
  signupSchema,
  resetPasswordSchema,
} from '@/lib/utils/validations';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

// --- FUNÇÕES AUXILIARES ---

const updatePasswordSchema = z.object({
  password: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

function logError(context, error) {
  console.error(`[${new Date().toISOString()}] [${context}]`, {
    message: error.message,
    stack: error.stack,
    ...(error.cause && { cause: error.cause }),
  });
}

function checkRateLimit(ipAddress) {
  console.log(`Rate limit check for IP: ${ipAddress}`);
  return true; // Sempre permitido por enquanto
}

function getErrorMessage(error) {
  const message = error.message.toLowerCase();

  if (message.includes('email already registered') || message.includes('user already registered')) {
    return 'Este e-mail já está cadastrado.';
  }

  if (message.includes('invalid login credentials') || message.includes('invalid email or password')) {
    return 'E-mail ou senha incorretos.';
  }

  if (message.includes('email not confirmed')) {
    return 'Por favor, confirme seu e-mail antes de fazer login.';
  }

  if (message.includes('password should be at least')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (message.includes('invalid email')) {
    return 'Formato de e-mail inválido.';
  }

  if (message.includes('too many requests')) {
    return 'Muitas tentativas. Tente novamente em alguns minutos.';
  }

  return error.message;
}

// --- AÇÕES ---

export async function signup(data) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    const { firstName, lastName, email, password } = signupSchema.parse(data);
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
        // ✅ CORRIGIDO: URL correto para confirmação
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/confirm?type=signup&next=/dashboard`
      },
    });

    if (error) throw error;

    const isConfirmed = !!userData.user?.email_confirmed_at;

    return {
      success: true,
      message: isConfirmed
        ? 'Conta criada e ativada com sucesso!'
        : 'Conta criada! Verifique seu e-mail para ativá-la.',
      requiresConfirmation: !isConfirmed,
      user: {
        id: userData.user?.id,
        email: userData.user?.email,
      },
    };
  } catch (error) {
    logError('SIGNUP', error);
    if (error instanceof z.ZodError) {
      throw new Error('Dados do formulário inválidos.');
    }
    throw new Error(getErrorMessage(error));
  }
}

export async function login(data) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    const { email, password } = loginSchema.parse(data);
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!userData.user) throw new Error('Erro ao processar login.');

    return {
      success: true,
      message: 'Login realizado com sucesso!',
      user: {
        id: userData.user.id,
        email: userData.user.email,
        emailConfirmed: !!userData.user.email_confirmed_at,
      },
    };
  } catch (error) {
    logError('LOGIN', error);
    if (error instanceof z.ZodError) {
      throw new Error('E-mail ou senha inválidos.');
    }
    throw new Error(getErrorMessage(error));
  }
}

export async function resetPassword(data) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    const { email } = resetPasswordSchema.parse(data);
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // ✅ CORRIGIDO: URL correto para recovery
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/confirm?type=recovery&next=/update-password`,
    });

    if (error) throw error;

    return {
      success: true,
      message: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.',
    };
  } catch (error) {
    logError('RESET_PASSWORD', error);
    if (error instanceof z.ZodError) {
      throw new Error('E-mail inválido.');
    }
    throw new Error(getErrorMessage(error));
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return {
      success: true,
      message: 'Logout realizado com sucesso.',
    };
  } catch (error) {
    logError('LOGOUT', error);
    throw new Error('Erro ao fazer logout.');
  }
}

export async function validateSession() {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      return {
        user: null,
        success: false,
        message: 'Sessão inválida.',
      };
    }

    return {
      user: user
        ? {
          id: user.id,
          email: user.email,
          emailConfirmed: !!user.email_confirmed_at,
          metadata: user.user_metadata,
        }
        : null,
      success: true,
      message: user ? 'Sessão válida.' : 'Nenhuma sessão ativa.',
    };
  } catch (error) {
    logError('VALIDATE_SESSION', error);
    return {
      user: null,
      success: false,
      message: 'Erro ao validar a sessão.',
    };
  }
}

export async function refreshSession() {
  try {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.refreshSession();

    if (error) throw error;

    if (!session) {
      return {
        success: false,
        message: 'Nenhuma sessão para renovar.',
      };
    }

    return {
      success: true,
      message: 'Sessão renovada com sucesso.',
      expiresAt: session.expires_at,
    };
  } catch (error) {
    logError('REFRESH_SESSION', error);
    throw new Error('Erro ao renovar a sessão.');
  }
}

export async function resendConfirmation(email) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        // ✅ CORRIGIDO: URL correto
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/confirm?type=signup&next=/dashboard`,
      },
    });

    if (error) throw error;

    return {
      success: true,
      message: 'E-mail de confirmação reenviado!',
    };
  } catch (error) {
    logError('RESEND_CONFIRMATION', error);
    throw new Error(getErrorMessage(error));
  }
}

export async function updatePassword(data) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1';

    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    const { password } = updatePasswordSchema.parse(data);
    const supabase = await createClient();

    // Verificar se o usuário está autenticado (necessário para recovery)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Sessão inválida. Solicite um novo link de recuperação.');
    }

    // Atualizar a senha
    const { data: updateData, error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) throw error;

    return {
      success: true,
      message: 'Senha atualizada com sucesso!',
      user: {
        id: updateData.user?.id,
        email: updateData.user?.email,
      },
    };
  } catch (error) {
    logError('UPDATE_PASSWORD', error);
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(firstError.message);
    }
    throw new Error(getErrorMessage(error));
  }
}