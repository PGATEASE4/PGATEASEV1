@@ .. @@
 import React from "react"
 import "@/app/globals.css"
 import { ThemeProvider } from "@/components/theme-provider"
+import { AuthProvider } from "@/lib/auth"
+import { Toaster } from "@/components/ui/toaster"
 import { Inter } from "next/font/google"
 
 const inter = Inter({ subsets: ["latin"] })
@@ .. @@
   return (
     <html lang="en">
       <body className={inter.className} suppressHydrationWarning={true}>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
-          {children}
+          <AuthProvider>
+            {children}
+            <Toaster />
+          </AuthProvider>
         </ThemeProvider>
       </body>
     </html>
   )
 }