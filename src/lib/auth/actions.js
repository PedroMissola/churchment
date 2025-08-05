'use server';

import { z } from 'zod';
import { loginSchema, signupSchema, resetPasswordSchema } from '@/lib/utils/validations';
import { createClient } from '@/lib/supabase/server'; // Padronizado
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// --- FUNÇÕES AUXILIARES ---

/**
 * Registra um erro no console do servidor para monitoramento.
 */
function logError(context, error) {
  console.error(`[${new Date().toISOString()}] [${context}]`, {
    message: error.message,
    stack: error.stack,
    ...(error.cause && { cause: error.cause })
  });
}

/**
 * Rate limiter simples baseado em headers (para desenvolvimento)
 * Em produção, use Redis ou similar
 */
function checkRateLimit(ipAddress) {
  // Por enquanto, apenas log - implemente Redis em produção
  console.log(`Rate limit check for IP: ${ipAddress}`);
  return true; // Sempre permite por enquanto
}

/**
 * Mapeia erros do Supabase para mensagens amigáveis
 */
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
  
  // Retorna a mensagem original se não for mapeada
  return error.message;
}

// --- AÇÕES DE AUTENTICAÇÃO ---

/**
 * Registra um novo usuário.
 */
export async function signup(data) {
  try {
    // Rate limiting básico
    const ipAddress = headers().get('x-forwarded-for') || 
                     headers().get('x-real-ip') || 
                     '127.0.0.1';
    
    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    // Validação dos dados
    const validatedData = signupSchema.parse(data);
    const { firstName, lastName, email, password } = validatedData;

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
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm?next=/dashboard`,
      },
    });

    if (error) {
      throw error;
    }

    // Verifica se o usuário precisa confirmar email
    if (!userData.user?.email_confirmed_at) {
      return {
        success: true,
        message: 'Conta criada! Verifique seu e-mail para ativá-la.',
        requiresConfirmation: true,
        user: {
          id: userData.user?.id,
          email: userData.user?.email,
        },
      };
    }

    return {
      success: true,
      message: 'Conta criada e ativada com sucesso!',
      requiresConfirmation: false,
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

/**
 * Realiza o login de um usuário.
 */
export async function login(data) {
  try {
    // Rate limiting básico
    const ipAddress = headers().get('x-forwarded-for') || 
                     headers().get('x-real-ip') || 
                     '127.0.0.1';
    
    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    // Validação dos dados
    const validatedData = loginSchema.parse(data);
    const { email, password } = validatedData;

    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Verifica se o usuário está ativo
    if (!userData.user) {
      throw new Error('Erro ao processar login.');
    }

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

/**
 * Envia um e-mail para redefinição de senha.
 */
export async function resetPassword(data) {
  try {
    // Rate limiting básico
    const ipAddress = headers().get('x-forwarded-for') || 
                     headers().get('x-real-ip') || 
                     '127.0.0.1';
    
    if (!checkRateLimit(ipAddress)) {
      throw new Error('Muitas tentativas. Tente novamente mais tarde.');
    }

    // Validação dos dados
    const validatedData = resetPasswordSchema.parse(data);
    const { email } = validatedData;

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm?type=recovery&next=/update-password`,
    });

    if (error) {
      throw error;
    }

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

/**
 * Logout do usuário.
 */
export async function logout() {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    return { 
      success: true, 
      message: 'Logout realizado com sucesso.' 
    };

  } catch (error) {
    logError('LOGOUT', error);
    throw new Error('Erro ao fazer logout.');
  }
}

/**
 * Valida a sessão atual do usuário no servidor.
 */
export async function validateSession() {
  try {
    const supabase = await createClient();
    
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      return { 
        user: null, 
        success: false, 
        message: 'Sessão inválida.' 
      };
    }

    return {
      user: user ? {
        id: user.id,
        email: user.email,
        emailConfirmed: !!user.email_confirmed_at,
        metadata: user.user_metadata,
      } : null,
      success: true,
      message: user ? 'Sessão válida.' : 'Nenhuma sessão ativa.',
    };

  } catch (error) {
    logError('VALIDATE_SESSION', error);
    return { 
      user: null, 
      success: false, 
      message: 'Erro ao validar a sessão.' 
    };
  }
}

/**
 * Força a renovação da sessão do usuário.
 */
export async function refreshSession() {
  try {
    const supabase = await createClient();
    
    const { data: { session }, error } = await supabase.auth.refreshSession();

    if (error) {
      throw error;
    }

    if (!session) {
      return { 
        success: false, 
        message: 'Nenhuma sessão para renovar.' 
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

/**
 * Reenvia o email de confirmação
 */
export async function resendConfirmation(email) {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm?next=/dashboard`,
      }
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: 'E-mail de confirmação reenviado!',
    };

  } catch (error) {
    logError('RESEND_CONFIRMATION', error);
    throw new Error(getErrorMessage(error));
  }
}