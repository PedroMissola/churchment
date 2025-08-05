'use client';

import { Typography } from "@material-tailwind/react";

export default function RegisterLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 w-full max-w-md mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-2 max-w-xs">
          <Typography as="div" variant="h1" className="h-6 w-40 rounded-full bg-gray-300 animate-pulse">&nbsp;</Typography>
          <Typography as="div" variant="paragraph" className="h-4 w-64 rounded-full bg-gray-300 animate-pulse">&nbsp;</Typography>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Nome e Sobrenome lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>
            <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>
          </div>

          {/* Email */}
          <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>

          {/* Senha */}
          <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>

          {/* Confirmar Senha */}
          <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <Typography as="div" className="h-6 w-6 rounded bg-gray-300 animate-pulse">&nbsp;</Typography>
            <Typography as="div" className="h-6 w-56 rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>
          </div>

          {/* Botão */}
          <Typography as="div" className="h-12 w-full rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>

        </form>

        {/* Footer */}
        <div className="text-center space-y-2 max-w-xs mx-auto">
          <Typography as="div" className="h-4 w-48 rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>
          <Typography as="div" className="h-4 w-32 rounded-lg bg-gray-300 animate-pulse">&nbsp;</Typography>
        </div>
      </div>
    </div>
  );
}
