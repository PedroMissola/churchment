'use client';

import { Typography } from '@material-tailwind/react';

export default function LoginLoading() {
  return (
    <form className="space-y-4 animate-pulse">
      {/* Mensagem de erro */}
      <div className="h-12 rounded-lg bg-red-200/60" />

      {/* Input de Email */}
      <div className="space-y-1">
        <Typography
          as="div"
          className="h-4 w-20 rounded-full bg-gray-300 mb-1"
        >
          &nbsp;
        </Typography>
        <div className="h-12 w-full rounded-lg bg-gray-300" />
        <div className="h-4 w-40 rounded-full bg-gray-300 mt-1" />
      </div>

      {/* Input de Senha */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Typography
            as="div"
            className="h-4 w-24 rounded-full bg-gray-300 mb-1"
          >
            &nbsp;
          </Typography>
          <div className="h-4 w-28 rounded-full bg-gray-300 mb-1" />
        </div>
        <div className="relative">
          <div className="h-12 w-full rounded-lg bg-gray-300 pr-12" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-gray-400" />
        </div>
        <div className="h-4 w-40 rounded-full bg-gray-300 mt-1" />
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded border border-gray-300 bg-gray-300" />
        <div>
          <Typography as="div" className="h-4 w-32 rounded-full bg-gray-300" />
          <Typography as="div" className="h-3 w-48 rounded-full bg-gray-300 mt-1" />
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-2">
        <Typography as="div" className="h-5 w-28 rounded-full bg-gray-300" />
        <Typography as="div" className="h-4 w-full rounded-full bg-gray-300" />
        <Typography as="div" className="h-4 w-5/6 rounded-full bg-gray-300" />
        <Typography as="div" className="h-4 w-3/4 rounded-full bg-gray-300" />
      </div>

      {/* Botão */}
      <div className="pt-4">
        <div className="h-12 w-full rounded-lg bg-gray-300" />
      </div>
    </form>
  );
}
