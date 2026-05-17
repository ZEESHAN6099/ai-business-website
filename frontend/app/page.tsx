'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I am your AI assistant. How can I help you today?',
    },
  ]);

  const [chatInput, setChatInput] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Sending...');

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Something went wrong. Please try again.');
    }
  }

async function handleChatSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!chatInput.trim()) return;

  const userMessage = chatInput;

  setChatMessages((prev) => [
    ...prev,
    { sender: 'user', text: userMessage },
  ]);

  setChatInput('');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    setChatMessages((prev) => [
      ...prev,
      { sender: 'bot', text: data.reply },
    ]);
  } catch {
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: 'Sorry, the chatbot is currently unavailable. Please try again later.',
      },
    ]);
  }
}

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <section className="relative px-6 py-8 lg:px-20">
        <div className="absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            AI<span className="text-cyan-400">Business</span>
          </h1>

          <a
            href="/admin/login"
            className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Admin Login
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid min-h-[85vh] max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              AI Websites • Chatbots • Automation
            </div>

            <h2 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Build a smarter business with{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-powered websites
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              We create premium business websites with AI chatbots, automation,
              lead capture, dashboards, and modern SEO to help companies grow
              faster.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-cyan-400 px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:scale-105"
              >
                Start Your Project
              </a>

              <a
                href="#services"
                className="rounded-full border border-white/10 px-7 py-4 font-semibold text-white transition hover:border-purple-400 hover:text-purple-300"
              >
                View Services
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
              {[
                ['24/7', 'AI Support'],
                ['100%', 'Responsive'],
                ['SEO', 'Ready'],
              ].map(([title, subtitle]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-cyan-300">{title}</p>
                  <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-[#0b1020] p-6">
                <div className="mb-6 flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="space-y-4">
                  <div className="max-h-80 space-y-4 overflow-y-auto pr-2">
                    {chatMessages.map((item, index) => (
                      <div
                        key={index}
                        className={
                          item.sender === 'bot'
                            ? 'rounded-2xl bg-cyan-400/10 p-4'
                            : 'ml-auto rounded-2xl bg-purple-400/10 p-4'
                        }
                      >
                        <p
                          className={
                            item.sender === 'bot'
                              ? 'text-sm text-cyan-300'
                              : 'text-sm text-purple-300'
                          }
                        >
                          {item.sender === 'bot' ? 'AI Assistant' : 'You'}
                        </p>

                        <p className="mt-2 text-white">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleChatSubmit} className="flex gap-3">
                    <input
                      className="flex-1 rounded-2xl border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
                      placeholder="Ask something..."
                      value={chatInput}
                      onChange={(event) => setChatInput(event.target.value)}
                    />

                    <button
                      className="rounded-2xl bg-cyan-400 px-5 font-bold text-slate-950"
                      type="submit"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}