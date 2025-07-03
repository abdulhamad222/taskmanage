// components/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signIn = (email, password) => {
    // *** Replace with real API call ***
    if (password === 'demo') {
      setUser({ email });
      router.push('/dashboard');
    } else {
      alert('Wrong password (hint: “demo”)');
    }
  };

  const signOut = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
