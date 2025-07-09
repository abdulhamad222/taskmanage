'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      setLoading(false);
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success('Registered successfully! Please login.');
      router.push('/login');
    } else {
      toast.error('Registration failed: ' + data.error);
    }

    setLoading(false);
  };

  const getPasswordStrength = () => {
    if (password.length < 6) return 'Weak';
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return 'Strong';
    return 'Medium';
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength === 'Weak') return 'text-red-500';
    if (strength === 'Medium') return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-[#0e0e0e] text-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md md:max-w-sm space-y-6 rounded-xl bg-[#282828] p-6 sm:p-8 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        <label className="block">
          <span className="text-sm font-medium">Full Name</span>
          <input
            type="text"
            required
            className="mt-1 w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            className="mt-1 w-full rounded border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block relative">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="mt-1 w-full rounded border px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <span className={`text-xs mt-1 ${getStrengthColor()}`}>
            Password is: {getPasswordStrength()}
          </span>
        </label>

        <label className="block relative">
          <span className="text-sm font-medium">Confirm Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="mt-1 w-full rounded border px-3 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-[#704ac2] focus:border-[#704ac2]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[#704ac2] px-4 py-2 font-semibold text-white hover:bg-[#5a3ca0] disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="text-center pt-4 text-sm">
          <Link
            href="/login"
            className="text-gray-300 hover:underline hover:text-white"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </main>
  );
}
