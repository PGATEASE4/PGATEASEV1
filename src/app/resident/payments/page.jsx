@@ .. @@
 import { format } from "date-fns"
-import { toast } from "@/hooks/use-toast"
+import { toast } from "sonner"
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
-import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "@/components/ui/chart"
+import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
+import { StatusBadge } from "@/components/ui/status-badge"
 
 // Sample payment data
 const paymentHistory = [
@@ .. @@
   // Handle payment submission
   const handlePaymentSubmit = () => {
     if (!paymentMethod) {
-      toast({
-        title: "Missing information",
-        description: "Please select a payment method.",
-        variant: "destructive",
-      })
+      toast.error("Please select a payment method.")
       return
     }
 
     // In a real app, this would redirect to a payment gateway
-    toast({
-      title: "Redirecting to payment gateway",
-      description: "You will be redirected to complete your payment.",
-    })
+    toast.success("You will be redirected to complete your payment.")
 
     // Simulate payment success after 2 seconds
     setTimeout(() => {
-      toast({
-        title: "Payment successful",
-        description: `Your payment of ₹${currentMonthPayment.amount} has been processed successfully.`,
-      })
+      toast.success(`Your payment of ₹${currentMonthPayment.amount} has been processed successfully.`)
       setIsPaymentDialogOpen(false)
       setPaymentMethod("")
     }, 2000)
@@ .. @@
   // Get status badge
   const getStatusBadge = (status) => {
-    switch (status) {
-      case "Paid":
-        return (
-          <Badge variant="outline" className="bg-green-50 text-green-700">
-            Paid
-          </Badge>
-        )
-      case "Due":
-        return (
-          <Badge variant="outline" className="bg-blue-50 text-blue-700">
-            Due
-          </Badge>
-        )
-      case "Overdue":
-        return <Badge variant="destructive">Overdue</Badge>
-      default:
-        return <Badge variant="outline">{status}</Badge>
-    }
+    return <StatusBadge status={status} />;
   }