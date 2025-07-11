'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin-auth');
    if (isAdmin !== 'true') {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div>
      {children}
    </div>
  );
}
