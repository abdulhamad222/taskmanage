'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin-auth');
    if (isAdmin === 'true') {
      setUser({ role: 'admin' }); // You can expand user info here
    }
    setIsReady(true);
  }, []);

  const signOut = () => {
    localStorage.removeItem('admin-auth');
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, isReady, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
