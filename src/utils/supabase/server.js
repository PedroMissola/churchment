// utils/supabase/server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers"; // Importa cookies do Next.js

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cria uma instância do cliente Supabase para Server Components e Server Actions.
 * Esta função deve ser chamada dentro de componentes assíncronos (async components)
 * ou Server Actions.
 *
 * @param {object} cookieStore - O objeto retornado por `cookies()` do Next.js.
 * @returns {SupabaseClient} Uma instância do cliente Supabase.
 */
export const createClient = (cookieStore) => {
  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        // O método getAll deve ser assíncrono e aguardar a chamada de cookieStore.getAll()
        async getAll() {
          return await cookieStore.getAll();
        },
        // setAll pode ser síncrono ou assíncrono, dependendo do que ele faz.
        // O Supabase chama setAll, então ele precisa ser definido.
        // O Next.js não permite setar cookies diretamente em Server Components,
        // mas a biblioteca @supabase/ssr lida com isso.
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Note: cookieStore.set() pode lançar um erro em Server Components
              // se a resposta já foi enviada, mas o createServerClient lida
              // com isso através do middleware.
              cookieStore.set(name, value, options);
            });
          } catch (e) {
            // Este bloco `catch` é para o cenário em que `cookieStore.set`
            // é chamado em um contexto onde a resposta já foi comprometida (enviada ao cliente).
            // A mensagem "O método setAll foi chamado em um Server Component..."
            // é uma indicação de que o middleware do Supabase/Next.js
            // é o responsável por propagar as mudanças de sessão.
            // Para depuração, você pode logar o erro, mas para produção,
            // frequentemente é aceitável ignorar se o middleware está funcionando.
            console.warn("Erro ao tentar setar cookies em Server Component:", e);
          }
        },
      },
    }
  );
};

// Exemplo de uso em um Server Component (app/page.jsx, como você já tem):
// import { cookies } from "next/headers";
// import { createClient } from "@/utils/supabase/server"; // Ajuste o caminho se necessário
//
// export default async function Page() {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   // Agora você pode usar 'supabase' para buscar dados.
//   const { data } = await supabase.from('your_table').select();
//   return <div>...</div>
// }