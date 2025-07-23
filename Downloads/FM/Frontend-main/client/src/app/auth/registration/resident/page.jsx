"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import RegistrationTypeSelector from "@/components/RegisterHeader"

export default function ResidentRegistration() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState("resident")
  const [otpRequired, setOtpRequired] = useState(false)
  const [otp, setOtp] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    occupation: "",
    pgCode: "",
    roomNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    permanentAddress: ""
  })

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
  try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 800))
      // Simulate backend response: OTP required for first login
      setOtpRequired(true)
      setIsLoading(false)
    } catch (error) {
      setError("Registration failed. Please try again.")
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 800))
      setPending(true)
      setIsLoading(false)
  } catch (error) {
      setError("Invalid OTP. Please try again.")
    setIsLoading(false)
  }
}

  if (pending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Card className="max-w-md w-full text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Registration Complete</h2>
          <p className="mb-4">Your account has been activated. You can now log in and access your dashboard.</p>
          <Link href="/auth/login" className="text-blue-600 hover:underline">Go to Login</Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <RegistrationTypeSelector selectedType={selectedType} onTypeChange={setSelectedType} />
        {selectedType === "resident" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl shadow-blue-500/10">
              <CardContent className="p-8">
                {!otpRequired ? (
                <form onSubmit={handleRegister} className="space-y-8">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" placeholder="John" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} required />
                        </div>
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={e => handleChange('email', e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                          <Label htmlFor="phone">Mobile Number *</Label>
                          <Input id="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} required />
                        </div>
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                          <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={e => handleChange('dateOfBirth', e.target.value)} required />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="gender">Gender *</Label>
                          <Input id="gender" placeholder="Gender" value={formData.gender} onChange={e => handleChange('gender', e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="occupation">Occupation *</Label>
                        <Input id="occupation" placeholder="Software Engineer, Student, etc." value={formData.occupation} onChange={e => handleChange('occupation', e.target.value)} required />
                      </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                          <Label htmlFor="roomNumber">Room Number *</Label>
                          <Input id="roomNumber" placeholder="101" value={formData.roomNumber} onChange={e => handleChange('roomNumber', e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                          <Label htmlFor="pgCode">PG Code *</Label>
                          <Input id="pgCode" placeholder="Enter PG code provided by your PG owner" value={formData.pgCode} onChange={e => handleChange('pgCode', e.target.value)} required />
                        </div>
                      </div>
                    </div>
                  <div className="bg-gradient-to-r from-gray-50 to-red-50/30 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Emergency Contact</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                          <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                          <Input id="emergencyContactName" placeholder="Parent/Guardian name" value={formData.emergencyContactName} onChange={e => handleChange('emergencyContactName', e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                          <Label htmlFor="emergencyContactPhone">Emergency Contact Mobile *</Label>
                          <Input id="emergencyContactPhone" type="tel" placeholder="+91 98765 43210" value={formData.emergencyContactPhone} onChange={e => handleChange('emergencyContactPhone', e.target.value)} required />
                        </div>
                      </div>
                    </div>
                  <div className="bg-gradient-to-r from-gray-50 to-purple-50/30 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                    </div>
                    <div className="space-y-3">
                        <Label htmlFor="permanentAddress">Permanent Address *</Label>
                        <Textarea id="permanentAddress" placeholder="Enter your permanent address" value={formData.permanentAddress} onChange={e => handleChange('permanentAddress', e.target.value)} required />
                      </div>
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <Button type="submit" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Resident Account"
                    )}
                  </Button>
                </form>
                ) : (
                  <form onSubmit={handleOtpSubmit} className="space-y-8">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">OTP Verification</h3>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="otp">Enter OTP (sent to your email/phone)</Label>
                        <Input id="otp" placeholder="One-Time Password" type="text" value={otp} onChange={e => setOtp(e.target.value)} required />
                      </div>
                    </div>
                    {error && <div className="text-red-600 text-sm">{error}</div>}
                    <Button type="submit" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Verifying OTP...
                        </div>
                      ) : (
                        "Verify & Complete Registration"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
              <div className="px-8 pb-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500">Or</span>
                  </div>
                </div>
                <div className="text-center text-sm space-y-2">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}