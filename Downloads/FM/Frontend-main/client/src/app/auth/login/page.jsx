"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ROLES = [
  { value: "admin", label: "PGatEase Admin" },
  { value: "owner", label: "PG Owner" },
  { value: "manager", label: "PG Manager" },
  { value: "resident", label: "Resident" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Example: Resident needs OTP on first login
      if (role === "resident" && !otpRequired) {
        // Simulate backend response: OTP required for first login
        setOtpRequired(true);
        setIsLoading(false);
        return;
      }

      // Simulate successful login and redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin/dashboard");
          break;
        case "owner":
          router.push("/owner/dashboard");
          break;
        case "manager":
          router.push("/admin/dashboard"); // Or /manager/dashboard if available
          break;
        case "resident":
          router.push("/resident/dashboard");
          break;
        default:
          router.push("/resident/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 800));
      // On success, redirect
      router.push("/resident/dashboard");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back
            </Button>
          </div>
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              PGatEase
            </span>
          </Link>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpRequired ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-900 dark:text-white">
                  Role
                </Label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded px-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {ROLES.map((r) => (
                    <option
                      key={r.value}
                      value={r.value}
                      className="text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                    >
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-900 dark:text-white"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">
                  Enter OTP (sent to your email/phone)
                </Label>
                <Input
                  id="otp"
                  placeholder="One-Time Password"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="text-center text-sm space-y-2">
            <p>Don&apos;t have an account?</p>
            <div className="flex flex-col space-y-1">
              <Link
                href="/auth/registration/resident"
                className="text-blue-600 hover:underline"
              >
                Sign up as Resident
              </Link>
              <Link
                href="/auth/registration/owner"
                className="text-blue-600 hover:underline"
              >
                Sign up as PG Owner
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
