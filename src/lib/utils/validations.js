import { z } from 'zod';
import validator from 'validator';
import * as zxcvbnCore from '@zxcvbn-ts/core';
import { dictionary, adjacencyGraphs } from '@zxcvbn-ts/language-common';

const { zxcvbn, setOptions } = zxcvbnCore;

if (typeof setOptions === 'function') {
  setOptions({
    dictionary: { ...dictionary },
    adjacencyGraphs,
    translations: {
      warnings: {
        straightRow: 'Sequências simples de teclas são fáceis de adivinhar',
        keyWalk: 'Sequências curtas de teclas são fáceis de adivinhar',
        repeats: 'Repetições como "aaa" são fáceis de adivinhar',
        sequences: 'Sequências como "abc" são fáceis de adivinhar',
        recentYears: 'Anos recentes são fáceis de adivinhar',
        dates: 'Datas são fáceis de adivinhar',
        topTen: 'Esta é uma senha muito comum',
        topHundred: 'Esta é uma senha comum',
        common: 'Esta é uma senha comum',
        similarToCommon: 'Esta senha é similar a senhas comuns',
        wordByItself: 'Palavras sozinhas são fáceis de adivinhar',
        namesByThemselves: 'Nomes sozinhos são fáceis de adivinhar',
        commonNames: 'Nomes comuns são fáceis de adivinhar',
        userInputs: 'A senha não deve conter seu nome ou partes do seu e-mail.',
        pwned: 'Esta senha foi encontrada em vazamentos de dados',
      },
      suggestions: {
        l33t: 'Evite substituições previsíveis como @ por a',
        reverseWords: 'Evite palavras invertidas',
        allUppercase: 'Não use apenas maiúsculas',
        capitalization: 'Use maiúsculas de forma não previsível',
        dates: 'Evite datas associadas a você',
        recentYears: 'Evite anos recentes',
        associatedYears: 'Evite anos associados a você',
        sequences: 'Evite sequências de caracteres',
        repeated: 'Evite repetições desnecessárias',
        longerKeyboardPattern: 'Use padrões de teclado mais longos',
        anotherWord: 'Adicione mais palavras não relacionadas',
        useWords: 'Use múltiplas palavras, mas evite frases comuns',
        noNeed: 'Você pode criar senhas fortes sem símbolos, números ou maiúsculas',
      },
    },
  });
} else {
  console.warn('⚠️ zxcvbn.setOptions() não está disponível — verifique o ambiente.');
}

// Domínios de e-mails descartáveis
const disposableEmailDomains = [
  '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'temp-mail.org', 'throwaway.email', 'maildrop.cc',
  '33mail.com', 'fakeinbox.com', 'spambox.us', 'tempinbox.com',
  'emailondeck.com', 'getairmail.com', 'rhyta.com', 'tmpeml.com'
];

// Normaliza e-mail do Gmail removendo pontos
const normalizeEmail = (email) => {
  const [user, domain] = email.split('@');
  if (domain && domain.toLowerCase() === 'gmail.com') {
    return user.replace(/\./g, '').toLowerCase() + '@gmail.com';
  }
  return email.toLowerCase();
};

// Validação de e-mail
const emailValidation = z
  .string()
  .min(1, { message: 'O e-mail é obrigatório.' })
  .max(254, { message: 'E-mail muito longo.' })
  .refine(email => validator.isEmail(email), {
    message: 'Formato de e-mail inválido.',
  })
  .refine(email => {
    const domain = email.split('@')[1]?.toLowerCase();
    return !disposableEmailDomains.includes(domain);
  }, { message: 'Formato de e-mail inválido ou domínio não permitido.' })
  .refine(email => {
    const domain = email.split('@')[1];
    return domain && domain.includes('.') && domain.split('.').length >= 2;
  }, { message: 'Domínio de e-mail inválido.' })
  .refine(email => {
    return !email.includes('..') &&
      !email.includes('--') &&
      !email.startsWith('.') &&
      !email.endsWith('.');
  }, { message: 'Formato de e-mail inválido.' })
  .transform(normalizeEmail);

// Remove acentos e caracteres especiais
const normalizeString = (str) => {
  return str
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]/g, '') // Remove caracteres especiais
    .toLowerCase();
};

// Função para capitalizar corretamente nomes com acentos
function capitalizeName(name) {
  if (!name) return '';

  const words = name.trim().toLowerCase().split(/\s+/);

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1);
  });

  return capitalizedWords.join(' ');
}

// Validação de nome com capitalização correta
const nameValidation = z
  .string()
  .min(1, { message: 'Este campo é obrigatório.' })
  .min(2, { message: 'Deve ter pelo menos 2 caracteres.' })
  .max(50, { message: 'Deve ter no máximo 50 caracteres.' })
  .refine(name => /^[a-zA-ZÀ-ÿ]+(?:[ '-][a-zA-ZÀ-ÿ]+)*$/.test(name), {
    message: 'Apenas letras, espaços, hífens e apóstrofos são permitidos.',
  })
  .transform(name => capitalizeName(name));

// Gera inputs do usuário para análise de senha
const getUserInputs = (data) => {
  const inputs = [
    data.first_name || data.firstName,  // ✅ Suporta ambos os formatos
    data.last_name || data.lastName,    // ✅ Suporta ambos os formatos
    data.email,
    data.email?.split('@')[0],
  ];

  return inputs
    .filter(Boolean)
    .map(input => normalizeString(input))
    .filter(input => input.length >= 3); // Filtra inputs com 3+ caracteres
};

// Validação de senha
const createPasswordValidation = (userInputs = []) => {
  return z
    .string()
    .min(1, { message: 'A senha é obrigatória.' })
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .max(128, { message: 'A senha não pode ter mais de 128 caracteres.' })
    .refine(password => {
      const result = zxcvbn(password, userInputs);
      return result.score >= 3;
    }, { message: 'Senha fraca. Use uma combinação mais complexa.' })
    .refine(password => {
      const uniqueChars = new Set(password).size;
      return uniqueChars >= Math.min(6, Math.floor(password.length / 2));
    }, { message: 'A senha deve ter uma maior variedade de caracteres.' })
    .refine(password => {
      const reversed = password.split('').reverse().join('');
      return password.toLowerCase() !== reversed.toLowerCase();
    }, { message: 'A senha não pode ser um palíndromo.' })
    .refine(password => {
      const keyboardPatterns = [
        'qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890',
        'qwerty', 'asdfgh', 'zxcvbn', '123456', '654321'
      ];
      const lowerPassword = password.toLowerCase();
      return !keyboardPatterns.some(pattern =>
        lowerPassword.includes(pattern) ||
        lowerPassword.includes(pattern.split('').reverse().join(''))
      );
    }, { message: 'Evite padrões de teclado óbvios.' })
    .refine(password => {
      const normalizedPassword = normalizeString(password);
      return !userInputs.some(input =>
        input && normalizedPassword.includes(input)
      );
    }, { message: 'A senha não deve conter seu nome ou partes do seu e-mail.' });
};

// ✅ SCHEMAS CORRIGIDOS PARA COMPATIBILIDADE

// Schema de login (sem alterações)
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
  rememberMe: z.boolean().optional(),
});

// ✅ Schema de signup compatível com o actions.js
export const signupSchema = z
  .object({
    firstName: nameValidation,     // ✅ Nome correto para actions.js
    lastName: nameValidation,      // ✅ Nome correto para actions.js
    email: emailValidation,
    password: z.string().min(1, { message: 'A senha é obrigatória.' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha.' }), // ✅ Nome corrigido
    terms: z.boolean().refine(val => val === true, {
      message: 'Você deve aceitar os termos e condições para continuar.'
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem.',
        path: ['confirmPassword'], // ✅ Path corrigido
      });
    }

    const userInputs = getUserInputs(data);
    const passwordSchema = createPasswordValidation(userInputs);
    const passwordResult = passwordSchema.safeParse(data.password);

    if (!passwordResult.success) {
      passwordResult.error.issues.forEach(error => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error.message,
          path: ['password'],
        });
      });
    }
  });

// ✅ Schema alternativo para formulários (mantém nomes originais)
export const signupFormSchema = z
  .object({
    first_name: nameValidation,     // Para o formulário
    last_name: nameValidation,      // Para o formulário
    email: emailValidation,
    password: z.string().min(1, { message: 'A senha é obrigatória.' }),
    confirm_password: z.string().min(1, { message: 'Confirme sua senha.' }),
    terms: z.boolean().refine(val => val === true, {
      message: 'Você deve aceitar os termos e condições para continuar.'
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não coincidem.',
        path: ['confirm_password'],
      });
    }

    const userInputs = getUserInputs(data);
    const passwordSchema = createPasswordValidation(userInputs);
    const passwordResult = passwordSchema.safeParse(data.password);

    if (!passwordResult.success) {
      passwordResult.error.issues.forEach(error => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: error.message,
          path: ['password'],
        });
      });
    }
  });

export const resetPasswordSchema = z.object({
  email: emailValidation,
});

export const newPasswordSchema = z
  .object({
    password: createPasswordValidation([]),
    confirmPassword: z.string().min(1, { message: 'Confirme sua nova senha.' }), // ✅ Nome corrigido
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'], // ✅ Path corrigido
  });

// Utilitários
export const analyzePassword = (password, userInputs = []) => {
  if (!password) {
    return {
      score: -1,
      strength: 'Sem senha',
      color: 'gray',
      crackTimeDisplay: '',
      feedback: { warning: null, suggestions: [] }
    };
  }

  const result = zxcvbn(password, userInputs);
  let strength = '';
  let color = '';

  switch (result.score) {
    case 0:
      strength = 'Muito fraca';
      color = 'red';
      break;
    case 1:
      strength = 'Fraca';
      color = 'orange';
      break;
    case 2:
      strength = 'Razoável';
      color = 'yellow';
      break;
    case 3:
      strength = 'Boa';
      color = 'lightgreen';
      break;
    case 4:
      strength = 'Muito boa';
      color = 'green';
      break;
    default:
      strength = '';
      color = 'gray';
  }

  return {
    score: result.score,
    strength: strength,
    color: color,
    crackTimeDisplay: result.crack_time_display,
    feedback: result.feedback,
  };
};

export const isDisposableEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? disposableEmailDomains.includes(domain) : false;
};

export { emailValidation, getUserInputs };