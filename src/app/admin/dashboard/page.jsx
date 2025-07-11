'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Spinner from '@/app/user/components/spinner';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const auth = localStorage.getItem('admin-auth');
      setIsAdmin(auth === 'true');
      setIsLoading(false);
    }, 200); // reduced delay for faster UX

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    toast.success('Logged out successfully!');
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-[#0e0e0e] text-white px-4">
        <Spinner />
        <p className="text-sm mt-2">Checking admin access…</p>
      </main>
    );
  }

  // Optional: silent redirect if not admin (avoid unauthorized flash)
  if (!isAdmin) {
    router.push('/admin');
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-4">
      <div className="text-center w-full max-w-2xl space-y-6 p-6 bg-[#1c1c1c] rounded-xl shadow">
        <h1 className="text-3xl font-bold">Welcome, Admin 👋</h1>
        <p className="text-sm sm:text-base">This is your secured Admin Dashboard 🎉</p>

        <button
          onClick={handleLogout}
          className="mt-4 rounded bg-[#704ac2] px-4 py-2 font-medium text-white hover:bg-[#5a3ca0]"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}
