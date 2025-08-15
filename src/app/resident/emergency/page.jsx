@@ .. @@
 import { format } from "date-fns";
-import { toast } from "@/hooks/use-toast";
+import { toast } from "sonner";
 import { cn } from "@/lib/utils";
 import {
   Card,
@@ .. @@
 } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Separator } from "@/components/ui/separator";
+import { StatusBadge } from "@/components/ui/status-badge";
+import { EmptyState } from "@/components/ui/empty-state";
 
 // Sample emergency alerts data
 const emergencyAlerts = [
@@ .. @@
   // Handle emergency submission
   const handleEmergencySubmit = () => {
     if (!emergencyType) {
-      toast({
-        title: "Missing information",
-        description: "Please select an emergency type.",
-        variant: "destructive",
-      });
+      toast.error("Please select an emergency type.");
       return;
     }
 
@@ .. @@
       if (isSending) {
         setIsSending(false);
-        toast({
-          title: "Emergency alert sent",
-          description: "Help is on the way. Stay calm and wait for assistance.",
-        });
+        toast.success("Help is on the way. Stay calm and wait for assistance.");
         setIsConfirmationDialogOpen(false);
         // Reset form
         setEmergencyType("");
@@ .. @@
   const handleEmergencyCancel = () => {
     clearInterval(countdownRef.current);
     setIsSending(false);
     setIsConfirmationDialogOpen(false);
-    toast({
-      title: "Emergency alert cancelled",
-      description: "Your emergency alert has been cancelled.",
-    });
+    toast.success("Your emergency alert has been cancelled.");
   };
 
   // Clean up interval on unmount
@@ .. @@
   // Get status badge
   const getStatusBadge = (status) => {
-    switch (status) {
-      case "Responded":
-        return (
-          <Badge variant="outline" className="status-success">
-            Responded
-          </Badge>
-        );
-      case "Pending":
-        return (
-          <Badge variant="outline" className="status-warning">
-            Pending
-          </Badge>
-        );
-      default:
-        return <Badge variant="outline">{status}</Badge>;
-    }
+    return <StatusBadge status={status} />;
   };