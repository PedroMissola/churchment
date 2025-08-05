import {
  emailValidation,
  signupSchema,
  loginSchema,
  resetPasswordSchema,
  newPasswordSchema,
  analyzePassword,
  isDisposableEmail,
} from './validations';

describe('Validação de E-mail', () => {
  it('valida um e-mail comum corretamente', () => {
    const result = emailValidation.safeParse('usuario@gmail.com');
    expect(result.success).toBe(true);
    expect(result.data).toBe('usuario@gmail.com'); // Remove os pontos do Gmail
  });

  it('rejeita e-mails com domínio descartável', () => {
    const result = emailValidation.safeParse('alguem@mailinator.com');
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toMatch(/domínio não permitido/i);
  });

  it('rejeita e-mails com formato inválido', () => {
    const result = emailValidation.safeParse('invalido@@gmail..com');
    expect(result.success).toBe(false);
  });
});

describe('Validação de Nome', () => {
  it('aceita nomes com acento e transforma em capitalizado', () => {
    const schema = signupSchema.shape.first_name;
    const result = schema.safeParse('joão da silva');
    expect(result.success).toBe(true);
    expect(result.data).toBe('João Da Silva');
  });

  it('rejeita nomes com números ou caracteres inválidos', () => {
    const schema = signupSchema.shape.first_name;
    const result = schema.safeParse('joão123');
    expect(result.success).toBe(false);
  });
});

describe('Validação de Senha', () => {
  const validUser = {
    first_name: 'Carlos',
    last_name: 'Santos',
    email: 'carlos.santos@gmail.com',
    password: 'SenhaF0rte!123',
    confirm_password: 'SenhaF0rte!123',
    terms: true,
  };

  it('aceita senha forte e sem dados pessoais', () => {
    const result = signupSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it('rejeita senhas que contêm partes do nome', () => {
    const result = signupSchema.safeParse({
      ...validUser,
      password: 'Carlos123!',
      confirm_password: 'Carlos123!',
    });
    expect(result.success).toBe(false);
    const message = result.error.issues.find(issue => issue.path[0] === 'password')?.message;
    expect(message).toMatch(/não deve conter seu nome/i);
  });

  it('rejeita senhas fracas (comum demais)', () => {
    const result = signupSchema.safeParse({
      ...validUser,
      password: '12345678',
      confirm_password: '12345678',
    });
    console.log('Resultado do safeParse:', result);
    if (!result.success) {
      console.log('Todos os issues:', result.error.issues);
    }
    const message = result.error.issues.find(issue => issue.path[0] === 'password')?.message;
    console.log('Mensagem de erro da senha:', message);
    expect(result.success).toBe(false);
    expect(message.toLowerCase()).toContain('senha');
  });

  it('rejeita senhas que não coincidem', () => {
    const result = signupSchema.safeParse({
      ...validUser,
      password: 'SenhaF0rte123!',
      confirm_password: 'OutraSenha!',
    });
    expect(result.success).toBe(false);
    const confirmError = result.error.issues.find(issue => issue.path[0] === 'confirm_password');
    expect(confirmError.message).toBe('As senhas não coincidem.');
  });
});

describe('Schemas de Autenticação', () => {
  it('valida login com email e senha', () => {
    const result = loginSchema.safeParse({
      email: 'teste@gmail.com',
      password: 'senhaSegura123!',
    });
    expect(result.success).toBe(true);
  });

  it('valida reset de senha', () => {
    const result = resetPasswordSchema.safeParse({
      email: 'teste@gmail.com',
    });
    expect(result.success).toBe(true);
  });

  it('valida criação de nova senha', () => {
    const result = newPasswordSchema.safeParse({
      password: 'NovaSenhaSegura@2025',
      confirm_password: 'NovaSenhaSegura@2025',
    });
    expect(result.success).toBe(true);
  });

  it('rejeita nova senha se for fraca', () => {
    const result = newPasswordSchema.safeParse({
      password: '123',
      confirm_password: '123',
    });
    expect(result.success).toBe(false);
  });

  it('rejeita nova senha se não coincidir', () => {
    const result = newPasswordSchema.safeParse({
      password: 'senhaSegura123!',
      confirm_password: 'outraSenha!',
    });
    expect(result.success).toBe(false);
  });
});

describe('Utilitários', () => {
  it('detecta domínio descartável', () => {
    expect(isDisposableEmail('fake@mailinator.com')).toBe(true);
    expect(isDisposableEmail('real@gmail.com')).toBe(false);
  });

  it('analisa pontuação de senha', () => {
    const result = analyzePassword('SenhaF0rteSegura123!');
    expect(result.score).toBeGreaterThanOrEqual(3);
  });
});
