'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head'; // Importa o componente Head do Next.js
import { Typography, Card } from '@material-tailwind/react';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página não encontrada | Seu Site</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="A página que você está procurando não foi encontrada. Clique no botão para voltar à página inicial." />
        <meta property="og:title" content="Página não encontrada | Seu Site" />
        <meta property="og:description" content="A página que você está procurando não foi encontrada. Clique no botão para voltar à página inicial." />
      </Head>

      <main className="min-h-screen flex items-center justify-center p-4" role="main">
        <Card className="w-full max-w-2xl p-8 text-center shadow-2xl">
          {/* Animated 404 */}
          <div className="relative mb-6" aria-hidden="true">
            <Typography
              type="h1"
              className="font-black text-neutral-900 opacity-20 select-none"
            >
              404
            </Typography>
          </div>

          {/* Main message */}
          <Typography type="h4" as="h2" className="mb-4 text-neutral-800 font-bold">
            Oops! Página não encontrada
          </Typography>

          <Typography className="mb-8 text-neutral-800">
            Parece que você se perdeu no espaço digital. A página que você está procurando
            pode ter sido movida, deletada ou nunca existiu.
          </Typography>

          <Typography className="mt-6 text-neutral-600">
            Se você acredita que isso é um erro, entre em contato conosco.
          </Typography>

          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <Link href="/contato">
                <button
                  className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                >
                  Entre em contato
                </button>
              </Link>
              <button
                className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                onClick={() => window.history.back()}
              >
                Voltar
              </button>
              <Link href="/">
                <button
                  className="underline inline-flex border font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-neutral-800 hover:bg-neutral-800/5 hover:border-neutral-800/5 shadow-none hover:shadow-none"
                >
                  Inicio
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}