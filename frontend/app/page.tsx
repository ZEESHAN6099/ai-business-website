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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus('Something went wrong.');
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold text-gray-900">
          AI Business Website
        </h1>

        <p className="mt-4 text-gray-600">
          We help businesses use AI chatbots, automation, and modern websites to
          grow faster.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>

          <button
            className="rounded-lg bg-black px-6 py-3 font-medium text-white"
            type="submit"
          >
            Send Message
          </button>

          {status && <p className="text-sm text-gray-700">{status}</p>}
        </form>
      </section>
    </main>
  );
}