'use client';

import { useAuth } from '@/app/user/components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '../components/spinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        router.push('/login');
      } else {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, router]);

  if (checking) {
    return (
      <main className="flex items-center justify-center h-screen bg-[#0e0e0e] text-white px-4">
        <Spinner />
        <p className="mt-2 text-sm">Checking authentication…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Welcome, {user?.name} 👋</h1>
        <p className="text-sm text-gray-400">This is your user dashboard.</p>
      </div>
    </main>
  );
}
