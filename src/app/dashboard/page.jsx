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
    const timer = setTimeout(() => setCheckingAuth(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (checkingAuth) {
    return (
      <main className="flex flex-col gap-2 h-screen items-center justify-center bg-[#0e0e0e] text-white px-4">
        <Spinner />
        <p className="text-sm">Checking authentication…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex h-screen items-center justify-center bg-[#0e0e0e] text-white px-4">
        <div className="text-center space-y-4 p-8 rounded-xl bg-[#1e1e1e] shadow-md w-full max-w-sm">
          <h2 className="text-xl font-semibold">Please sign in first</h2>
          <button
            onClick={() => router.push('/')}
            className="w-full rounded bg-[#704ac2] px-4 py-2 font-medium text-white hover:bg-[#5a3ca0]"
          >
            Go to Sign In
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-4">
      <div className="text-center w-full max-w-2xl space-y-6 p-6 bg-[#1c1c1c] rounded-xl shadow">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome, {user.name} ({user.email})
        </h1>
        <p className="text-sm sm:text-base">This is your Task Manager Dashboard 🎉</p>

        <button
          onClick={signOut}
          className="mt-4 rounded bg-[#704ac2] px-4 py-2 font-medium text-white hover:bg-[#5a3ca0]"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
