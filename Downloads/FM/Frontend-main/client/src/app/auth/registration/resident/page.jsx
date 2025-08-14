'use client';
import { account, teams } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResidentRegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const register = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Step 1: Register user
      await account.create('unique()', email, password, name);
      // Step 2: Add user to the 'resident' team
      await teams.createMembership(
        'pgateaseteam1resident', // ✅ Actual Team ID for resident
        email,
        ['resident'],
        'https://pgateasev-1.vercel.app/auth/verify' // Updated URL
      );
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Resident Registration</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Registration successful! Check your email for verification.</div>}
    </div>
  );
}