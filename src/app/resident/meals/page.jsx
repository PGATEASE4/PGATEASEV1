@@ .. @@
 import { format, addDays, startOfWeek, isSameDay } from "date-fns";
-import { toast } from "@/hooks/use-toast";
+import { toast } from "sonner";
 import { Switch } from "@/components/ui/switch";
 import {
   Tooltip,
@@ .. @@
 } from "@/components/ui/tooltip";
 import { cn } from "@/lib/utils";
+import { StatusBadge } from "@/components/ui/status-badge";
+import { EmptyState } from "@/components/ui/empty-state";
 
 // Sample meal data
 const weeklyMenu = [
@@ .. @@
     updatedMenu[dayIndex].meals[mealIndex].status = "pending";
     setMenu(updatedMenu);
 
-    toast({
-      title: "Meal preference updated",
-      description:
-        "Your meal preference has been updated. Don't forget to confirm before the cutoff time.",
-    });
+    toast.success("Your meal preference has been updated. Don't forget to confirm before the cutoff time.");
   };
 
   // Handle meal confirmation
@@ .. @@
     updatedMenu[dayIndex].meals[mealIndex].status = "confirmed";
     setMenu(updatedMenu);
 
-    toast({
-      title: "Meal confirmed",
-      description: "Your meal selection has been confirmed.",
-    });
+    toast.success("Your meal selection has been confirmed.");
   };
 
   // Handle meal skipping
@@ .. @@
     updatedMenu[dayIndex].meals[mealIndex].status = "skipped";
     setMenu(updatedMenu);
 
-    toast({
-      title: "Meal skipped",
-      description: "You have chosen to skip this meal.",
-    });
+    toast.success("You have chosen to skip this meal.");
   };
 
   // Handle meal feedback submission
   const handleFeedbackSubmission = (rating, comment) => {
-    toast({
-      title: "Feedback submitted",
-      description: "Thank you for your feedback!",
-    });
+    toast.success("Thank you for your feedback!");
     setFeedbackMeal(null);
   };
 
@@ .. @@
     setPreferences(newPreferences);
     setIsPreferencesDialogOpen(false);
 
-    toast({
-      title: "Preferences updated",
-      description: "Your meal preferences have been updated.",
-    });
+    toast.success("Your meal preferences have been updated.");
   };
 
   // Get status badge
   const getStatusBadge = (status) => {
-    switch (status) {
-      case "confirmed":
-        return (
-          <Badge variant="outline" className="status-success">
-            Confirmed
-          </Badge>
-        );
-      case "pending":
-        return (
-          <Badge variant="outline" className="status-info">
-            Pending
-          </Badge>
-        );
-      case "skipped":
-        return (
-          <Badge variant="outline" className="status-warning">
-            Skipped
-          </Badge>
-        );
-      default:
-        return (
-          <Badge variant="outline" className="status-neutral">
-            Not Selected
-          </Badge>
-        );
-    }
+    return <StatusBadge status={status} />;
   };