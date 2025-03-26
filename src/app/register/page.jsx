"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Erro ao registrar usuário");
            }

            const data = await res.json();
            console.log("Usuário registrado com sucesso:", data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen min-w-4xl bg-gray-100 '>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2 className="text-2xl">Email</h2>
                    <input className="border p-2 w-full mb-2 border-gray-600 rounded-md"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                <h2 className="text-2xl">Senha</h2>
                    <input className="border p-2 w-full mb-2 border-gray-600 rounded-md"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <Button type="submit" className="flex mx-auto mt-5 cursor-pointer">Registrar</Button>
            </form>
        </div>
    );
}
