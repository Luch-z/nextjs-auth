import { getServerSession } from "next-auth";
import { authOptions } from "@/backend/authentication/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Acesso negado</p>;

  return <div>Bem-vindo, {session.user.email}</div>;
}
