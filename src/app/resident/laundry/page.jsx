@@ .. @@
 import { format, addDays } from "date-fns";
-import { toast } from "@/hooks/use-toast";
+import { toast } from "sonner";
 import { Progress } from "@/components/ui/progress";
 import {
   Select,
@@ .. @@
   TableRow,
 } from "@/components/ui/table";
+import { StatusBadge } from "@/components/ui/status-badge";
+import { EmptyState } from "@/components/ui/empty-state";
 
 // Sample laundry data
 const laundryRequests = [
@@ .. @@
   // Handle new request submission
   const handleNewRequestSubmit = () => {
     // Validate request
     if (newRequest.time === "") {
-      toast({
-        title: "Missing information",
-        description: "Please select a pickup time.",
-        variant: "destructive",
-      });
+      toast.error("Please select a pickup time.");
       return;
     }
 
     if (totalItemsInNewRequest === 0) {
-      toast({
-        title: "Missing information",
-        description: "Please add at least one item to your laundry request.",
-        variant: "destructive",
-      });
+      toast.error("Please add at least one item to your laundry request.");
       return;
     }
 
     if (totalItemsInNewRequest > laundryLimits.remainingThisWeek) {
-      toast({
-        title: "Limit exceeded",
-        description: `You can only request ${laundryLimits.remainingThisWeek} more items this week.`,
-        variant: "destructive",
-      });
+      toast.error(`You can only request ${laundryLimits.remainingThisWeek} more items this week.`);
       return;
     }
 
     // In a real app, this would send the request to the server
-    toast({
-      title: "Laundry request submitted",
-      description: `Your laundry will be picked up on ${format(
-        new Date(newRequest.date),
-        "MMM d"
-      )} at ${newRequest.time}.`,
-    });
+    toast.success(`Your laundry will be picked up on ${format(new Date(newRequest.date), "MMM d")} at ${newRequest.time}.`);
 
     setIsNewRequestDialogOpen(false);
     // Reset form
@@ .. @@
   // Handle rating submission
   const handleRatingSubmit = () => {
     if (rating === 0) {
-      toast({
-        title: "Missing rating",
-        description: "Please select a rating.",
-        variant: "destructive",
-      });
+      toast.error("Please select a rating.");
       return;
     }
 
     // In a real app, this would send the rating to the server
-    toast({
-      title: "Rating submitted",
-      description: "Thank you for your feedback!",
-    });
+    toast.success("Thank you for your feedback!");
 
     setIsRatingDialogOpen(false);
     setRating(0);
@@ .. @@
   // Get status badge
   const getStatusBadge = (status) => {
-    switch (status) {
-      case "Delivered":
-        return (
-          <Badge variant="outline" className="status-success">
-            Delivered
-          </Badge>
-        );
-      case "In Process":
-        return (
-          <Badge variant="outline" className="status-info">
-            In Process
-          </Badge>
-        );
-      case "Picked":
-        return (
-          <Badge variant="outline" className="status-pending">
-            Picked
-          </Badge>
-        );
-      case "Requested":
-        return (
-          <Badge variant="outline" className="status-warning">
-            Requested
-          </Badge>
-        );
-      default:
-        return <Badge variant="outline">{status}</Badge>;
-    }
+    return <StatusBadge status={status} />;
   };