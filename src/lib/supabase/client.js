// src/lib/supabase/client.js
import { createBrowserClient } from '@supabase/ssr';

// CORRETO: Nenhuma alteração necessária.
// Cria o cliente para uso no lado do navegador (Client Components).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}