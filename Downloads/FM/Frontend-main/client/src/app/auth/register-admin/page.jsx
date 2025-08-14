'use client';

import { useState } from 'react';
import { account, teams } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

export default function RegisterAdmin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await account.create('unique()', email, password, name);

      await teams.createMembership(
        'pgateaseteam4admin', // ✅ Actual Team ID for admin
        email,
        ['admin'],
        'https://pgateasev-1.vercel.app/auth/verify'
      );

      alert('Admin account created. Please verify your email.');
      router.push('/auth/login');
    } catch (err) {
      console.error('Admin registration error:', err.message);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register as Admin</button>
    </div>
  );
} 