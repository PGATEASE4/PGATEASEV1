@@ .. @@
 'use client';
 import { useState } from 'react';
 import { useRouter } from 'next/navigation';
-import { account, teams } from '@/lib/appwrite';
-import { pickRoleFromMemberships, ROLE_ROUTE } from '@/lib/role';
+import { useAuth } from '@/lib/auth';
+import { Button } from '@/components/ui/button';
+import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
+import { Input } from '@/components/ui/input';
+import { Label } from '@/components/ui/label';
+import Link from 'next/link';
 
 export default function LoginPage() {
   const router = useRouter();
+  const { signIn } = useAuth();
   const [email, setEmail]   = useState('');
   const [password, setPass] = useState('');
   const [loading, setLoading] = useState(false);
   const [err, setErr] = useState('');
 
   const onLogin = async () => {
     setLoading(true); setErr('');
     try {
-      await account.createSession(email, password);
-
-      // Fetch memberships (must be confirmed via email!)
-      const m = await teams.list(); // { total, teams? memberships? } -> we want .memberships
-      const memberships = m?.memberships ?? m?.teams ?? [];
-      const role = pickRoleFromMemberships(memberships);
-
-      if (!role) {
-        // No confirmed team yet → send them to verify page or a holding page
-        router.push('/auth/verify'); 
-        return;
-      }
-      router.push(ROLE_ROUTE[role]);
+      const { role } = await signIn(email, password);
+      
+      // Route based on role
+      const routes = {
+        admin: '/admin/dashboard',
+        owner: '/owner/dashboard',
+        manager: '/manager/dashboard',
+        resident: '/resident/dashboard'
+      };
+      
+      router.push(routes[role] || '/resident/dashboard');
     } catch (e) {
       setErr(e?.message || 'Login failed');
     } finally {
@@ .. @@
   };
 
   return (
-    <div className="max-w-sm mx-auto mt-24 space-y-3">
-      <h1 className="text-2xl font-semibold">Log in</h1>
-      <input className="border p-2 w-full rounded" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
-      <input className="border p-2 w-full rounded" type="password" placeholder="Password" onChange={e=>setPass(e.target.value)} />
-      <button className="w-full rounded p-2 border" onClick={onLogin} disabled={loading}>
-        {loading ? 'Checking…' : 'Login'}
-      </button>
-      {err && <p className="text-red-600 text-sm">{err}</p>}
+    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
+      <Card className="w-full max-w-md">
+        <CardHeader className="text-center">
+          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
+            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
+            </svg>
+          </div>
+          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
+          <CardDescription>Sign in to your PGatEase account</CardDescription>
+        </CardHeader>
+        <CardContent className="space-y-4">
+          <div className="space-y-2">
+            <Label htmlFor="email">Email</Label>
+            <Input 
+              id="email"
+              type="email"
+              placeholder="Enter your email" 
+              value={email}
+              onChange={e => setEmail(e.target.value)} 
+            />
+          </div>
+          <div className="space-y-2">
+            <Label htmlFor="password">Password</Label>
+            <Input 
+              id="password"
+              type="password" 
+              placeholder="Enter your password" 
+              value={password}
+              onChange={e => setPass(e.target.value)} 
+            />
+          </div>
+          {err && <p className="text-red-600 text-sm">{err}</p>}
+          <Button 
+            className="w-full" 
+            onClick={onLogin} 
+            disabled={loading}
+          >
+            {loading ? 'Signing in...' : 'Sign In'}
+          </Button>
+          <div className="text-center text-sm">
+            <span className="text-muted-foreground">Don't have an account? </span>
+            <Link href="/auth/registration/resident" className="text-blue-600 hover:underline">
+              Register here
+            </Link>
+          </div>
+        </CardContent>
+      </Card>
     </div>
   );
 }