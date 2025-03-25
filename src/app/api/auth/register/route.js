import bcrypt from 'bcryptjs';
import supabase from '@/backend/db/supabase';

// Função de registro novo usuário
async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Inserindo o usuário no banco de dados do Supabase
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Handler da requisição para registrar o usuário
export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: 'Email e senha são obrigatórios' }),
      { status: 400 }
    );
  }

  try {
    const user = await registerUser(email, password);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }),
      { status: 500 }
    );
  }
}
