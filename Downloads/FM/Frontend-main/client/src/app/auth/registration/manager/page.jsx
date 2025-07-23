"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import RegistrationTypeSelector from "@/components/RegisterHeader"

export default function ManagerRegistration() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    inviteCode: ""
  })
  const [error, setError] = useState("")

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }
    if (!formData.inviteCode) {
      setError("Invite code is required.")
      setIsLoading(false)
      return
    }
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setSuccess(true)
      setIsLoading(false)
    } catch (error) {
      setError("Registration failed. Please try again.")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Card className="max-w-md w-full text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Registration Complete</h2>
          <p className="mb-4">Your account has been created. You can now log in and manage your PG property.</p>
          <Link href="/auth/login" className="text-blue-600 hover:underline">Go to Login</Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <RegistrationTypeSelector selectedType="manager" onTypeChange={() => {}} />
        <div className="animate-in slide-in-from-bottom-4 duration-300">
          <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl shadow-blue-500/10">
            <CardContent className="p-8">
              <form onSubmit={handleRegister} className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Manager Registration</h3>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Jane Doe" value={formData.name} onChange={e => handleChange('name', e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="jane.doe@example.com" value={formData.email} onChange={e => handleChange('email', e.target.value)} required />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone">Mobile Number *</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="password">Password *</Label>
                      <Input id="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={e => handleChange('password', e.target.value)} required />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="inviteCode">Invite Code *</Label>
                    <Input id="inviteCode" placeholder="Enter invite code from PG Owner" value={formData.inviteCode} onChange={e => handleChange('inviteCode', e.target.value)} required />
                  </div>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <Button type="submit" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Manager Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 