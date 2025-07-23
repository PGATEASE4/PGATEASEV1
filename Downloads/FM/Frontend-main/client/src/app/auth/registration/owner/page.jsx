"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import RegistrationTypeSelector from "@/components/RegisterHeader"

export default function OwnerRegistration() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedType, setSelectedType] = useState("owner")
  const [pendingApproval, setPendingApproval] = useState(false)
  const [ownerFormData, setOwnerFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    identityProof: null,
    propertyProof: null
  })

  const handleOwnerChange = (field, value) => {
    setOwnerFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (field, file) => {
    setOwnerFormData(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const handleOwnerRegister = async (e) => {
  e.preventDefault()
  setIsLoading(true)

    if (ownerFormData.password !== ownerFormData.confirmPassword) {
      alert("Passwords don't match")
      setIsLoading(false)
      return
    }
    if (!ownerFormData.identityProof || !ownerFormData.propertyProof) {
      alert("Please upload both identity and property proof documents.")
      setIsLoading(false)
      return
    }

    try {
      // Prepare form data for file upload
      const formData = new FormData()
      formData.append("firstName", ownerFormData.firstName)
      formData.append("lastName", ownerFormData.lastName)
      formData.append("email", ownerFormData.email)
      formData.append("phone", ownerFormData.phone)
      formData.append("password", ownerFormData.password)
      formData.append("role", "owner")
      formData.append("identityProof", ownerFormData.identityProof)
      formData.append("propertyProof", ownerFormData.propertyProof)

    // Make API call to register endpoint
      const response = await fetch("/api/auth/register-owner", {
        method: "POST",
        body: formData
    })
    const data = await response.json()
    if (response.ok) {
        setPendingApproval(true)
    } else {
        alert(data.message || "Registration failed")
    }
  } catch (error) {
    console.error("Registration failed:", error)
      alert("Network error. Please try again.")
  } finally {
    setIsLoading(false)
  }
}

  const handleTypeChange = (type) => {
    setSelectedType(type)
  }

  if (pendingApproval) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <Card className="max-w-md w-full text-center p-8">
          <CardHeader>
            <CardTitle>Registration Submitted</CardTitle>
            <CardDescription>Your registration is pending admin approval. You will be notified by email once approved.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/auth/login" className="text-blue-600 hover:underline">Back to Login</Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-6 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <RegistrationTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
        {selectedType === "owner" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <Card className="backdrop-blur-sm bg-white/95 border-0 shadow-2xl shadow-blue-500/10">
              <CardContent className="p-8">
                <form onSubmit={handleOwnerRegister} className="space-y-8">
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
                        <Label htmlFor="owner-firstName">First Name *</Label>
                        <Input id="owner-firstName" placeholder="John" value={ownerFormData.firstName} onChange={e => handleOwnerChange("firstName", e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="owner-lastName">Last Name *</Label>
                        <Input id="owner-lastName" placeholder="Smith" value={ownerFormData.lastName} onChange={e => handleOwnerChange("lastName", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="owner-email">Email Address *</Label>
                        <Input id="owner-email" type="email" placeholder="john.smith@example.com" value={ownerFormData.email} onChange={e => handleOwnerChange("email", e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="owner-phone">Phone Number *</Label>
                        <Input id="owner-phone" type="tel" placeholder="+91 98765 43210" value={ownerFormData.phone} onChange={e => handleOwnerChange("phone", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="owner-password">Password *</Label>
                        <Input id="owner-password" type="password" placeholder="Create a strong password" value={ownerFormData.password} onChange={e => handleOwnerChange("password", e.target.value)} required />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="owner-confirmPassword">Confirm Password *</Label>
                        <Input id="owner-confirmPassword" type="password" placeholder="Confirm your password" value={ownerFormData.confirmPassword} onChange={e => handleOwnerChange("confirmPassword", e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="identityProof">Identity Proof (Aadhaar, PAN, etc.) *</Label>
                        <Input id="identityProof" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange("identityProof", e.target.files[0])} required />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="propertyProof">Property Proof (Deed, Utility Bill, etc.) *</Label>
                        <Input id="propertyProof" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange("propertyProof", e.target.files[0])} required />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create PG Owner Account"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
                <div className="relative">
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
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}