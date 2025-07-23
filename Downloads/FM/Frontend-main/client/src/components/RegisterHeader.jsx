"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegistrationTypeSelector({ selectedType, onTypeChange }) {
  const router = useRouter()

  const handleRegistrationType = (type) => {
    onTypeChange(type)
    if (type === "owner") {
      router.push("/auth/registration/owner")
    } else if (type === "resident") {
      router.push("/auth/registration/resident")
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50/50 to-white border border-blue-100 shadow-xl">
      <div className="p-4">
        {/* Top Navigation with Icon */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 px-3 py-2 rounded-lg font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
          
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent mb-1">
            Choose Your Role
          </h1>
          <p className="text-blue-600/80 text-sm">
            Select how you want to use our platform
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
          {/* Property Owner Option */}
          <div 
            onClick={() => handleRegistrationType("owner")}
            className={`group cursor-pointer rounded-xl p-3 transition-all duration-300 border-2 hover:scale-105 ${
              selectedType === "owner" 
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg shadow-blue-200/50" 
                : "border-blue-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50"
            }`}
          >
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedType === "owner" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" 
                  : "bg-blue-100 group-hover:bg-blue-200"
              }`}>
                <svg 
                  className={`w-6 h-6 transition-colors ${
                    selectedType === "owner" ? "text-white" : "text-blue-600"
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <div>
                <h3 className={`font-semibold ${
                  selectedType === "owner" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Property Owner
                </h3>
                <p className={`text-xs ${
                  selectedType === "owner" ? "text-blue-700" : "text-gray-600"
                }`}>
                  List and manage your PG properties
                </p>
              </div>
            </div>
          </div>

          {/* Resident Option */}
          <div 
            onClick={() => handleRegistrationType("resident")}
            className={`group cursor-pointer rounded-xl p-3 transition-all duration-300 border-2 hover:scale-105 relative ${
              selectedType === "resident" 
                ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg shadow-blue-200/50" 
                : "border-blue-200 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50"
            }`}
          >
            {/* Popular Badge */}
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow-lg">
                Most Popular
              </span>
            </div>
            
            <div className="text-center space-y-2 pt-1">
              <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${
                selectedType === "resident" 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" 
                  : "bg-blue-100 group-hover:bg-blue-200"
              }`}>
                <svg 
                  className={`w-6 h-6 transition-colors ${
                    selectedType === "resident" ? "text-white" : "text-blue-600"
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <div>
                <h3 className={`font-semibold ${
                  selectedType === "resident" ? "text-blue-900" : "text-gray-900"
                }`}>
                  Resident
                </h3>
                <p className={`text-xs ${
                  selectedType === "resident" ? "text-blue-700" : "text-gray-600"
                }`}>
                  Manage complaints and issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}