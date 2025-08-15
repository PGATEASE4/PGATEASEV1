import React from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import { ManagerSidebar } from "@/components/manager/sidebar"

export default function ManagerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['manager']}>
      <ManagerSidebar>{children}</ManagerSidebar>
    </ProtectedRoute>
  )
}