import { format } from "date-fns"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/empty-state"

// Sample complaints data
const complaints = [
@@ .. @@
    // Validate complaint
    if (!newComplaint.title.trim()) {
      toast.error("Please enter a title for your complaint.")
      return
    }

    if (!newComplaint.category) {
      toast.error("Please select a category for your complaint.")
      return
    }

    if (!newComplaint.description.trim()) {
      toast.error("Please provide a description of your complaint.")
      return
    }

    // In a real app, this would send the complaint to the server
    toast.success("Your complaint has been submitted successfully.")

    setIsNewComplaintDialogOpen(false)
    // Reset form
@@ .. @@
  // Handle reply submission
  const handleReplySubmit = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply.")
      return
    }

    // In a real app, this would send the reply to the server
    toast.success("Your reply has been submitted successfully.")

    setReplyText("")
  }
@@ .. @@
  // Handle rating submission
  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating.")
      return
    }

    // In a real app, this would send the rating to the server
    toast.success("Thank you for your feedback!")

    setIsRatingDialogOpen(false)
    setRating(0)
@@ .. @@
  // Get status badge
  const getStatusBadge = (status) => {
    return <StatusBadge status={status} />
  }

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const variant = priority === 'High' ? 'error' : priority === 'Medium' ? 'warning' : 'success';
    return <StatusBadge status={priority} variant={variant} />
  }
@@ .. @@
                ) : (
                  <EmptyState
                    icon={MessageSquare}
                    title="No complaints found"
                    description={
                      searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                        ? "Try adjusting your filters to see more results."
                        : "You haven't lodged any complaints yet."
                    }
                    action={
                      <Button onClick={() => setIsNewComplaintDialogOpen(true)}>
                        Lodge a Complaint
                      </Button>
                    }
                  />
                )}
              </div>
            </Tabs>