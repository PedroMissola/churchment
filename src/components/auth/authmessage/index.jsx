'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  if (!message) return null;

  return (
    <div className="bg-red-900/50 text-red-300 border border-red-700/50 p-3 mb-4 rounded-lg text-sm" role="alert">
      {message}
    </div>
  );
}