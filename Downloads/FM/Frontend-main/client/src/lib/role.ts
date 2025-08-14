export const TEAM_ROLE_MAP: Record<string, 'admin'|'owner'|'manager'|'resident'> = {
  [process.env.NEXT_PUBLIC_TEAM_ADMIN!]: 'admin',
  [process.env.NEXT_PUBLIC_TEAM_OWNER!]: 'owner',
  [process.env.NEXT_PUBLIC_TEAM_MANAGER!]: 'manager',
  [process.env.NEXT_PUBLIC_TEAM_RESIDENT!]: 'resident',
};

export const ROLE_ROUTE: Record<string, string> = {
  admin: '/admin/dashboard',
  owner: '/owner/dashboard',
  manager: '/manager/dashboard',
  resident: '/resident/dashboard',
};

export function pickRoleFromMemberships(memberships: any[]): 'admin'|'owner'|'manager'|'resident'|null {
  // prioritize admin > owner > manager > resident
  const rank: Record<string, number> = { admin: 4, owner: 3, manager: 2, resident: 1 };
  let best: {role: any, score: number} | null = null;
  for (const m of memberships) {
    const teamId = m.teamId || m.team?.$id || m.$id; // Appwrite returns teamId
    const role = TEAM_ROLE_MAP[teamId];
    if (!role) continue;
    const score = rank[role];
    if (!best || score > best.score) best = { role, score };
  }
  return best?.role ?? null;
}
