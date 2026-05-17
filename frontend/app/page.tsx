'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Sending...');

    const response = await fetch('http://localhost:5000/contact', {
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
                  <div className="rounded-2xl bg-cyan-400/10 p-4">
                    <p className="text-sm text-cyan-300">AI Assistant</p>
                    <p className="mt-2 text-white">
                      Hello! I can help your customers instantly.
                    </p>
                  </div>

                  <div className="ml-auto rounded-2xl bg-purple-400/10 p-4">
                    <p className="text-sm text-purple-300">Customer</p>
                    <p className="mt-2 text-white">
                      Can you collect leads and answer questions?
                    </p>
                  </div>

                  <div className="rounded-2xl bg-cyan-400/10 p-4">
                    <p className="text-sm text-cyan-300">AI Assistant</p>
                    <p className="mt-2 text-white">
                      Yes. I can capture names, emails, and project details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-6 py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl font-bold md:text-5xl">
            Premium features for modern businesses
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ['AI Chatbot', 'Give customers instant answers 24/7.'],
              ['Lead Capture', 'Save contact messages directly to database.'],
              ['Admin Dashboard', 'Manage business messages securely.'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-2 hover:border-cyan-400/50"
              >
                <div className="mb-6 h-12 w-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500" />
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="mt-4 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-2 md:p-12">
          <div>
            <h2 className="text-4xl font-bold">Let’s build your AI website</h2>
            <p className="mt-4 text-slate-300">
              Send your details and our team will contact you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <input
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <textarea
              className="w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
              placeholder="Tell us about your project"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />

            <button
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-4 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              type="submit"
            >
              Send Message
            </button>

            {status && <p className="text-sm text-cyan-300">{status}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}