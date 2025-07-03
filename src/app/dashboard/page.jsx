'use client';

import { useAuth } from '@/components/AuthContext';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  if (!user) {
    redirect('/');
  }

  return (
    <main className="p-10">
      <h1 className="mb-6 text-3xl font-bold">Welcome, {user.email}</h1>

      {/* Put your task‑manager UI here */}
      <p className="mb-4">This is your dashboard 🎉</p>

      <button
        onClick={signOut}
        className="rounded bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-900"
      >
        Sign out
      </button>
    </main>
  );
}
