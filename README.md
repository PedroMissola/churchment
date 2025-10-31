# Churchment - Plataforma de Gestão para Igrejas

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend%20&%20Auth-green?logo=supabase)](https://supabase.com)
[![Material Tailwind](https://img.shields.io/badge/Material%20Tailwind-UI-blue?logo=tailwindcss)](https://www.material-tailwind.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

## Sobre o Projeto

O Churchment é uma plataforma SaaS (Software as a Service) full-stack moderna projetada para a gestão de igrejas. A aplicação é construída usando o App Router do Next.js 15 e utiliza o Supabase como backend principal para autenticação, banco de dados e gerenciamento de sessões.

Este repositório contém tanto a landing page pública (marketing, planos, FAQ) quanto a aplicação principal protegida por autenticação (dashboard).

## ✨ Stack de Tecnologias

* **Framework:** [Next.js](https://nextjs.org/) (v15)
    * App Router
    * Server Components & Server Actions
* **Backend & Auth:** [Supabase](https://supabase.com/)
    * Autenticação (Email/Senha, OAuth)
    * Gerenciamento de Sessão (via `@supabase/ssr`)
* **UI & Estilização:**
    * [Material Tailwind](https://www.material-tailwind.com/) (Biblioteca de componentes principal)
    * [Tailwind CSS](https://tailwindcss.com/)
    * [Framer Motion](https://www.framer.com/motion/) (Animações)
    * [Iconoir React](https://iconoir.com/) (Ícones)
* **Formulários & Validação:**
    * [React Hook Form](https://react-hook-form.com/)
    * [Zod](https://zod.dev/) (Validação de schemas)
    * [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) (Análise de força de senha)
* **Serviços de Email:**
    * [Brevo (Sendinblue)](https://www.brevo.com/) (para notificações de erro da API)
    * [Supabase Auth](https://supabase.com/docs/guides/auth) (para emails de confirmação, reset de senha)
* **Deployment:** [Vercel](https://vercel.com/) (inferido pelo uso de `@vercel/speed-insights`)

## 🚀 Funcionalidades Implementadas

* **Landing Page Completa:** Uma página inicial (`/`) estática e otimizada para SEO com várias seções (Features, Preços, Testemunhos, FAQ, CTA).
* **Sistema de Autenticação Completo:**
    * Cadastro (`/register`) com validação de força de senha.
    * Login (`/login`).
    * Fluxo de Recuperação de Senha (`/reset-password`, `/reset-password-pending`, `/update-password`).
    * Verificação de Email (`/verify-email`) com lógica de reenvio.
* **Rotas Protegidas (Dashboard):**
    * O `middleware.js` protege o grupo de rotas `/(dashboard)` contra acesso não autenticado.
    * Redireciona usuários logados para o dashboard se tentarem acessar as páginas de auth.
    * Força a verificação de e-mail antes de permitir o acesso ao dashboard.
* **Gerenciamento de Sessão:**
    * Utiliza `AuthProvider` (`src/lib/authProvider.js`) como um contexto React para gerenciar o estado do usuário no lado do cliente.
    * Utiliza o `@supabase/ssr` no `middleware.js` e Server Actions para gerenciar a sessão no lado do servidor.
* **Server Actions:** O fluxo de autenticação (`signup`, `login`, `resetPassword`, `updatePassword`) é implementado usando Next.js Server Actions (`src/lib/auth/actions.js`).
* **Notificação de Erros:**
    * Uma página de erro global (`src/app/error.js`) que, em produção, envia um e-mail de notificação detalhado para o administrador usando a API do Brevo (via `/api/send-error-notification`).
    * Páginas `not-found.js` e `loading.js` customizadas.

## 📂 Estrutura do Projeto

A estrutura segue as convenções do Next.js App Router:

```

src/
├── app/
│   ├── (auth)/             \# Grupo de rotas para autenticação
│   │   ├── login/
│   │   ├── register/
│   │   ├── reset-password/
│   │   └── ...
│   ├── (dashboard)/        \# Grupo de rotas protegidas
│   │   ├── dashboard/
│   │   └── layout.js
│   ├── api/                \# API Routes (auth callbacks, notificações)
│   │   ├── auth/
│   │   └── send-error-notification/
│   ├── layout.js           \# Layout raiz
│   ├── page.jsx            \# Landing Page pública
│   ├── error.js            \# Error boundary global
│   └── not-found.js        \# Página 404
│
├── components/
│   ├── auth/               \# Componentes de autenticação
│   ├── home/               \# Componentes da Landing Page
│   ├── layout/             \# Navbar, Footer, CTA, etc.
│   └── ui/                 \# Componentes de UI genéricos (Cards, Toggle)
│
├── lib/
│   ├── auth/               \# Server Actions de autenticação
│   ├── supabase/           \# Clientes Supabase (server, client)
│   ├── utils/              \# Validações (Zod), gtag, etc.
│   └── authProvider.js     \# Contexto React para sessão
│
└── middleware.js           \# Middleware de autenticação e sessão

````

## 🏃 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/pedromissola/churchment.git](https://github.com/pedromissola/churchment.git)
    cd churchment
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto. Você precisará das suas chaves do Supabase. Para a notificação de erros, você também precisará de uma chave da API do Brevo (Sendinblue).

    ```.env.local
    # Supabase (Obrigatório)
    NEXT_PUBLIC_SUPABASE_URL=https://[SEU_PROJETO].supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[SUA_CHAVE_ANON]

    # URL base da sua aplicação (Obrigatório para links de auth)
    NEXT_PUBLIC_BASE_URL=http://localhost:3000

    # Brevo/Sendinblue (Opcional - para notificação de erros)
    BREVO_API_KEY=[SUA_CHAVE_API_BREVO]
    NOTIFICATION_EMAIL=[EMAIL_PARA_RECEBER_ERROS]
    FROM_EMAIL=[EMAIL_REMETENTE_AUTORIZADO]
    FROM_NAME=Sistema de Erros
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
