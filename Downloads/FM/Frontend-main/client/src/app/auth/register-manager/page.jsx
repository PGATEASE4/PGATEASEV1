'use client';
import { account, teams, databases, ID, Permission, Role } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ManagerRegistrationPage() {
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
      // Step 1: Create Appwrite account
      const user = await account.create('unique()', email, password, name);
      
      // Step 2: Create an email session to authenticate the user
      await account.createEmailSession(email, password);
      
      // Step 3: Add user to manager team (now authenticated)
      await teams.createMembership(
        process.env.NEXT_PUBLIC_TEAM_MANAGER || 'pgateaseteam3manager',
        email,
        ['manager'],
        process.env.NEXT_PUBLIC_VERIFY_URL || 'https://pgateasev-1.vercel.app/auth/verify'
      );

      // Step 4: Create user document with manager permissions
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DB_ID || '688302d20028c1439891',
        process.env.NEXT_PUBLIC_USERS_COL_ID || 'pgateaseuserscollection',
        ID.unique(),
        {
          name: name,
          email: email,
          role: 'manager',
          userId: user.$id
        },
        [
          // Self-access
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          
          // Residents can read managers (for contact info)
          Permission.read(Role.team(process.env.NEXT_PUBLIC_TEAM_RESIDENT || 'pgateaseteam1resident')),
          
          // Admins can do everything
          Permission.read(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin')),
          Permission.update(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin')),
          Permission.delete(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin'))
        ]
      );

      setSuccess(true);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Manager Registration</h2>
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