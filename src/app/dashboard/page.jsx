'use client';

import { useAuth } from '@/components/AuthContext';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCheckingAuth(false);
    }, 500);
  }, []);

  if (checkingAuth) {
    return (
      <main className="flex gap-2 h-screen items-center justify-center">
        <Spinner />
        <p className="text-white text-sm">Checking authentication…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#0e0e0e] text-white">
        <div className="text-center space-y-4 p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold">Please sign in first</h2>
          <button
            onClick={() => router.push('/')}
            className="rounded bg-[#704ac2] px-4 py-2 font-medium text-white hover:bg-[#5a3ca0]"
          >
            Go to Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-10 text-white bg-[#0e0e0e] min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">
        Welcome, {user.name} ({user.email})
      </h1>

      <p className="mb-4">This is your dashboard 🎉</p>

      <button
        onClick={signOut}
        className="rounded bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-900"
      >
        Sign out
      </button>
    </main>
  );
}
