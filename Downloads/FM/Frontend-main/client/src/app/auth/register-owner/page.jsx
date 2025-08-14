'use client';

import { useState } from 'react';
import { account, teams } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';

export default function RegisterOwner() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await account.create('unique()', email, password, name);

      await teams.createMembership(
        'pgateaseteam2owner', // ✅ Actual Team ID for owner
        email,
        ['owner'],
        'https://pgateasev-1.vercel.app/auth/verify'
      );

      alert('Owner account created. Please verify your email.');
      router.push('/auth/login');
    } catch (err) {
      console.error('Owner registration error:', err.message);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register as Owner</button>
    </div>
  );
} 