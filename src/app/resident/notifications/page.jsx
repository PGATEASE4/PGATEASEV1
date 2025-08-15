import { format, isToday, isYesterday } from "date-fns"
import { toast } from "sonner"
import { StatusBadge } from "@/components/ui/status-badge"
import { EmptyState } from "@/components/ui/empty-state"

// Sample notifications data
const initialNotifications = [
@@ .. @@
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
    toast.success("All notifications marked as read")
  }

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast.success("Notification deleted")
  }

  // Toggle notification setting
  const toggleNotificationSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
    const action = notificationSettings[setting] ? "Disabled" : "Enabled";
    const settingName = setting.replace(/([A-Z])/g, " $1").toLowerCase();
    toast.success(`${action} ${settingName}`)
  }