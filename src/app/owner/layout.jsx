@@ .. @@
 import React from "react"
+import ProtectedRoute from "@/components/ProtectedRoute"
 import { OwnerSidebar } from "@/components/owner/sidebar"
 
 export default function OwnerLayout({ children }) {
-  return <OwnerSidebar>{children}</OwnerSidebar>
+  return (
+    <ProtectedRoute allowedRoles={['owner']}>
+      <OwnerSidebar>{children}</OwnerSidebar>
+    </ProtectedRoute>
+  )
 }