'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('admin2@example.com');
  const [password, setPassword] = useState('admin123');
  const [status, setStatus] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Checking credentials...');

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('adminToken', data.accessToken);
      router.push('/admin/dashboard');
    } else {
      setStatus(data.message || 'Login failed');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] p-6 text-white">
      <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-[-10%] bottom-[-10%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
      >
        <p className="mb-3 text-sm font-medium text-cyan-300">
          Secure Admin Access
        </p>

        <h1 className="text-4xl font-black tracking-tight">
          Welcome back
        </h1>

        <p className="mt-3 text-slate-300">
          Login to manage leads and contact messages.
        </p>

        <div className="mt-8 space-y-5">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-4 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
            type="submit"
          >
            Enter Dashboard
          </button>
        </div>

        {status && <p className="mt-5 text-sm text-red-300">{status}</p>}
      </form>
    </main>
  );
}