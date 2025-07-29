// utils/supabase/client.js
import { createBrowserClient } from "@supabase/ssr"; // Importação correta

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cria uma instância do cliente Supabase para Client Components.
 * Deve ser usado dentro de componentes com 'use client'.
 *
 * @returns {SupabaseClient} Uma instância do cliente Supabase.
 */
export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey
  );

// Exemplo de uso em um Client Component:
// "use client";
// import { useEffect, useState } from 'react';
// import { createClient } from '@/utils/supabase/client'; // Ajuste o caminho
//
// function MyClientComponent() {
//   const [data, setData] = useState(null);
//   const supabase = createClient();
//
//   useEffect(() => {
//     async function fetchData() {
//       const { data: someData } = await supabase.from('your_table').select();
//       setData(someData);
//     }
//     fetchData();
//   }, [supabase]);
//
//   return <div>{JSON.stringify(data)}</div>;
// }