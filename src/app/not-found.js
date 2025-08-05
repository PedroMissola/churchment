'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="mb-4 text-6xl font-extrabold text-gray-700">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-600">Página não encontrada</h2>
      <p className="mb-8 text-gray-500">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link
        href="/"
        className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
