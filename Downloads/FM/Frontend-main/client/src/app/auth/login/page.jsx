'use client';
import { account, teams } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      await account.createEmailSession(email, password);
      const userTeams = await teams.list(); // Get the user's teams
      const role = userTeams.teams[0]?.name; // Get the first team's name

      // Redirect based on the user's role
      if (role === 'resident') {
        router.push('/resident/dashboard');
      } else if (role === 'owner') {
        router.push('/owner/dashboard');
      } else if (role === 'manager') {
        router.push('/manager/dashboard');
      } else if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        // Default redirect if no role matches
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
