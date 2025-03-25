// app/api/auth/test/route.js
import supabase from "@/backend/db/supabase";

async function testConnection() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Erro ao acessar a tabela:', error.message);
    return new Response(
      JSON.stringify({ message: 'Erro ao conectar ao banco de dados', error: error.message }),
      { status: 500 }
    );
  } else {
    console.log('Consulta bem-sucedida:', data);
    return new Response(JSON.stringify({ message: 'Conexão bem-sucedida!', data }), { status: 200 });
  }
}

// Handler da requisição
export async function GET(req) {
  return await testConnection();
}
