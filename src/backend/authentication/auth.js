import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = {
                    id: "1",
                    email: "admin@example.com",
                    password: "$2b$12$tcyypVSD9KhB0da8wi4MEu5cpWwLQOIOjSBpOCMxyKspLOkEMispa", // Senha "123456" criptografada
                };

                if (
                    !user ||
                    !(await bcrypt.compare(credentials.password, user.password))
                ) {
                    throw new Error("Invalid credentials");
                }

                return { id: user.id, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
    },
};
