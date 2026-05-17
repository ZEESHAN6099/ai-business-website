'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState('Loading messages...');

  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();
      setMessages(data);
      setStatus('');
    }

    fetchMessages();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] p-6 text-white md:p-10">
      <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <section className="relative z-10 mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-cyan-300">
                AI Business Admin
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Contact Messages
              </h1>
              <p className="mt-3 text-slate-300">
                Manage website leads from your protected dashboard.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white transition hover:border-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Total Messages</p>
              <p className="mt-2 text-4xl font-black text-cyan-300">
                {messages.length}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 text-2xl font-bold text-green-300">Live</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-400">Security</p>
              <p className="mt-2 text-2xl font-bold text-purple-300">
                JWT Protected
              </p>
            </div>
          </div>
        </div>

        {status && <p className="mt-8 text-slate-300">{status}</p>}

        <div className="mt-8 grid gap-5">
          {messages.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur transition hover:border-cyan-400/50"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="mt-1 text-cyan-300">{item.email}</p>
                </div>

                <p className="text-sm text-slate-400">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <p className="mt-5 leading-7 text-slate-200">{item.message}</p>
            </div>
          ))}
        </div>

        {!status && messages.length === 0 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-8 text-center">
            <p className="text-slate-300">No messages yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}