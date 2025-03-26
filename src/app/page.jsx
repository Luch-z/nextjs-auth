import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen min-w-4xl bg-gray-100 gap-10">
            <h1 className="text-3xl">Next Auth</h1>
            <Link href={"/login"}>
            <Button>Login</Button>
            </Link>
        </main>
    );
}
