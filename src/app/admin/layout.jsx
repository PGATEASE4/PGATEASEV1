import React from "react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ProtectedRoute>
  )
}