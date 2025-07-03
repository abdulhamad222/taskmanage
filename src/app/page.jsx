'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthContext';

export default function Home() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <p className="p-6">Redirecting to dashboard…</p>;
  }

  const handleSubmit = e => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-xl bg-[#282828] p-8 shadow"
      >
        <h1 className="text-2xl font-bold text-center">Sign in</h1>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            className="text-gray-600 mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            required
            className="text-gray-600 mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="w-full rounded bg-[#704ac2] px-4 py-2 font-semibold text-white transition hover:bg-[#8B5CF6]"
        >
          Continue
        </button>
      </form>
    </main>
  );
}
