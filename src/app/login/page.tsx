"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import React from "react";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        const res = await fetch(`${window.location.origin}/api/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({phone, password}),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
            return;
        }

        router.push("/tk");
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 bg-white space-y-4">
                <div className="flex items-center justify-center space-x-4">
                    <Image src="/logo-nedir-gala.png" alt="logo"
                           width={50} height={50}/>
                    <p className="font-medium text-xl max-w-72">Nedir Gala</p>
                </div>
                {error && <p className="text-red-600">{error}</p>}

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-600 text-white p-2 w-full rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
