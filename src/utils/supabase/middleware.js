// utils/supabase/middleware.js
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server"; // Importa NextResponse

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function updateSession(request) { // Tornar a função assíncrona
  // Cria uma resposta não modificada
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Define o cookie na requisição (para que o Supabase possa lê-lo em chamadas subsequentes)
            request.cookies.set(name, value);
            // Define o cookie na resposta (para que ele seja enviado de volta ao navegador)
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh the session in case it expired in the middle of a request
  // ou para lidar com tokens de refresh.
  // Isso é crucial para manter a sessão ativa.
  await supabase.auth.getSession();

  return supabaseResponse;
}

// Em seu arquivo `middleware.js` na raiz do projeto, você faria:
// import { updateSession } from './utils/supabase/middleware';
//
// export async function middleware(request) {
//   return await updateSession(request);
// }
//
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };