'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { account, teams } from '@/lib/appwrite';
import { pickRoleFromMemberships } from '@/lib/role';

export default function RequireRole({ allow, children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await account.get(); // throws if not logged in
        const m = await teams.list();
        const memberships = m?.memberships ?? m?.teams ?? [];
        const role = pickRoleFromMemberships(memberships);
        if (!role || !allow.includes(role)) {
          router.replace('/unauthorized');
          return;
        }
        setOk(true);
      } catch {
        router.replace('/auth/login');
      }
    })();
  }, [router, allow]);

  if (!ok) return null; // or a spinner
  return children;
}
