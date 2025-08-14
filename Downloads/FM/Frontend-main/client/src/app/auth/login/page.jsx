'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account, teams } from '@/lib/appwrite';
import { pickRoleFromMemberships, ROLE_ROUTE } from '@/lib/role';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]   = useState('');
  const [password, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onLogin = async () => {
    setLoading(true); setErr('');
    try {
      await account.createSession(email, password);

      // Fetch memberships (must be confirmed via email!)
      const m = await teams.list(); // { total, teams? memberships? } -> we want .memberships
      const memberships = m?.memberships ?? m?.teams ?? [];
      const role = pickRoleFromMemberships(memberships);

      if (!role) {
        // No confirmed team yet → send them to verify page or a holding page
        router.push('/auth/verify'); 
        return;
      }
      router.push(ROLE_ROUTE[role]);
    } catch (e) {
      setErr(e?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 space-y-3">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <input className="border p-2 w-full rounded" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 w-full rounded" type="password" placeholder="Password" onChange={e=>setPass(e.target.value)} />
      <button className="w-full rounded p-2 border" onClick={onLogin} disabled={loading}>
        {loading ? 'Checking…' : 'Login'}
      </button>
      {err && <p className="text-red-600 text-sm">{err}</p>}
    </div>
  );
}
