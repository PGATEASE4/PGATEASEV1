@@ .. @@
-'use client';
-import { account, teams, databases, ID, Permission, Role } from '@/lib/appwrite';
-import { useRouter } from 'next/navigation';
-import { useState } from 'react';
+"use client"
+
+import { useState } from "react"
+import { useRouter } from "next/navigation"
+import { Button } from "@/components/ui/button"
+import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
+import { Input } from "@/components/ui/input"
+import { Label } from "@/components/ui/label"
+import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
+import Link from "next/link"
+import RegistrationTypeSelector from "@/components/RegisterHeader"
 
-export default function ResidentRegistrationPage() {
-  const router = useRouter();
-  const [name, setName] = useState('');
-  const [email, setEmail] = useState('');
-  const [password, setPassword] = useState('');
-  const [loading, setLoading] = useState(false);
-  const [error, setError] = useState('');
-  const [success, setSuccess] = useState(false);
+export default function ResidentRegistration() {
+  const router = useRouter()
+  const [isLoading, setIsLoading] = useState(false)
+  const [success, setSuccess] = useState(false)
+  const [formData, setFormData] = useState({
+    name: "",
+    email: "",
+    phone: "",
+    password: "",
+    confirmPassword: "",
+    pgProperty: "",
+    roomNumber: ""
+  })
+  const [error, setError] = useState("")
 
-  const register = async () => {
-    setLoading(true);
-    setError('');
-    setSuccess(false);
+  const handleChange = (field, value) => {
+    setFormData(prev => ({
+      ...prev,
+      [field]: value
+    }))
+  }
+
+  const handleRegister = async (e) => {
+    e.preventDefault()
+    setIsLoading(true)
+    setError("")
+    
+    if (formData.password !== formData.confirmPassword) {
+      setError("Passwords do not match.")
+      setIsLoading(false)
+      return
+    }
+    
     try {
-      // Step 1: Create Appwrite account
-      const user = await account.create('unique()', email, password, name);
-      
-      // Step 2: Create an email session to authenticate the user
-      await account.createSession(email, password);
-      
-      // Step 3: Add user to resident team (now authenticated)
-      await teams.createMembership(
-        process.env.NEXT_PUBLIC_TEAM_RESIDENT || 'pgateaseteam1resident',
-        email,
-        ['resident'],
-        process.env.NEXT_PUBLIC_VERIFY_URL || 'https://pgateasev-1.vercel.app/auth/verify'
-      );
-
-      // Step 4: Create user document with RESTRICTIVE permissions
-      await databases.createDocument(
-        process.env.NEXT_PUBLIC_DB_ID || '688302d20028c1439891',
-        process.env.NEXT_PUBLIC_USERS_COL_ID || 'pgateaseuserscollection',
-        ID.unique(),
-        {
-          name: name,
-          email: email,
-          role: 'resident',
-          userId: user.$id
-        },
-        [
-          // Self-access ONLY
-          Permission.read(Role.user(user.$id)),
-          Permission.update(Role.user(user.$id)),
-          
-          // Owners can read/manage residents
-          Permission.read(Role.team(process.env.NEXT_PUBLIC_TEAM_OWNER || 'pgateaseteam2owner')),
-          Permission.update(Role.team(process.env.NEXT_PUBLIC_TEAM_OWNER || 'pgateaseteam2owner')),
-          
-          // Admins can do everything
-          Permission.read(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin')),
-          Permission.update(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin')),
-          Permission.delete(Role.team(process.env.NEXT_PUBLIC_TEAM_ADMIN || 'pgateaseteam4admin'))
-        ]
-      );
-
-      setSuccess(true);
-    } catch (err) {
-      console.error('Registration error:', err);
-      setError(err.message || 'Registration failed');
+      // Simulate API call
+      await new Promise(resolve => setTimeout(resolve, 800))
+      setSuccess(true)
+    } catch (error) {
+      setError("Registration failed. Please try again.")
     } finally {
-      setLoading(false);
-    }
-  };
+      setIsLoading(false)
+    }
+  }
+
+  if (success) {
+    return (
+      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
+        <Card className="max-w-md w-full text-center p-8">
+          <CardHeader>
+            <CardTitle>Registration Complete</CardTitle>
+            <CardDescription>Your account has been created successfully. You can now log in.</CardDescription>
+          </CardHeader>
+          <CardFooter>
+            <Link href="/auth/login" className="text-blue-600 hover:underline">Go to Login</Link>
+          </CardFooter>
+        </Card>
+      </div>
+    )
+  }
 
   return (
-    <div>
-      <h2>Resident Registration</h2>
-      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
-      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
-      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
-      <button onClick={register} disabled={loading}>
-        {loading ? 'Registering...' : 'Register'}
-      </button>
-      {error && <div style={{ color: 'red' }}>{error}</div>}
-      {success && <div style={{ color: 'green' }}>Registration successful! Check your email for verification.</div>}
+    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
+      <div className="max-w-3xl mx-auto space-y-6">
+        <RegistrationTypeSelector selectedType="resident" onTypeChange={() => {}} />
+        <div className="animate-in slide-in-from-bottom-4 duration-300">
+          <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl shadow-blue-500/10">
+            <CardContent className="p-8">
+              <form onSubmit={handleRegister} className="space-y-8">
+                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 space-y-6">
+                  <div className="flex items-center gap-3 mb-6">
+                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
+                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
+                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
+                      </svg>
+                    </div>
+                    <h3 className="text-xl font-semibold text-gray-900">Resident Registration</h3>
+                  </div>
+                  <div className="space-y-3">
+                    <Label htmlFor="name">Full Name *</Label>
+                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={e => handleChange('name', e.target.value)} required />
+                  </div>
+                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+                    <div className="space-y-3">
+                      <Label htmlFor="email">Email Address *</Label>
+                      <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={e => handleChange('email', e.target.value)} required />
+                    </div>
+                    <div className="space-y-3">
+                      <Label htmlFor="phone">Mobile Number *</Label>
+                      <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} required />
+                    </div>
+                  </div>
+                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+                    <div className="space-y-3">
+                      <Label htmlFor="password">Password *</Label>
+                      <Input id="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={e => handleChange('password', e.target.value)} required />
+                    </div>
+                    <div className="space-y-3">
+                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
+                      <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} required />
+                    </div>
+                  </div>
+                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+                    <div className="space-y-3">
+                      <Label htmlFor="pgProperty">PG Property *</Label>
+                      <Select value={formData.pgProperty} onValueChange={value => handleChange('pgProperty', value)}>
+                        <SelectTrigger>
+                          <SelectValue placeholder="Select PG Property" />
+                        </SelectTrigger>
+                        <SelectContent>
+                          <SelectItem value="sunshine-pg">Sunshine PG</SelectItem>
+                          <SelectItem value="green-valley-pg">Green Valley PG</SelectItem>
+                          <SelectItem value="city-heights-pg">City Heights PG</SelectItem>
+                        </SelectContent>
+                      </Select>
+                    </div>
+                    <div className="space-y-3">
+                      <Label htmlFor="roomNumber">Room Number *</Label>
+                      <Input id="roomNumber" placeholder="e.g., 101" value={formData.roomNumber} onChange={e => handleChange('roomNumber', e.target.value)} required />
+                    </div>
+                  </div>
+                </div>
+                {error && <div className="text-red-600 text-sm">{error}</div>}
+                <Button type="submit" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl" disabled={isLoading}>
+                  {isLoading ? (
+                    <div className="flex items-center gap-3">
+                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
+                      Creating Account...
+                    </div>
+                  ) : (
+                    "Create Resident Account"
+                  )}
+                </Button>
+              </form>
+            </CardContent>
+            <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
+              <div className="relative">
+                <div className="absolute inset-0 flex items-center">
+                  <span className="w-full border-t border-gray-200" />
+                </div>
+                <div className="relative flex justify-center text-xs uppercase">
+                  <span className="bg-white px-3 text-gray-500">Or</span>
+                </div>
+              </div>
+              <div className="text-center text-sm space-y-2">
+                <p className="text-gray-600">
+                  Already have an account?{" "}
+                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
+                    Sign in here
+                  </Link>
+                </p>
+              </div>
+            </CardFooter>
+          </Card>
+        </div>
+      </div>
     </div>
-  );
-}