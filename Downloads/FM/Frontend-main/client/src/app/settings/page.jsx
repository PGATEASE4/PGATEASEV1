"use client"           
import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter as DialogFooterUI } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { UserPlus, Home, Users, Bell, CreditCard, Settings as SettingsIcon, UserCog, UserCheck, List, Mail, User, KeyIcon } from 'lucide-react';
import { useRouter } from "next/navigation"

// Simulate getting the current user's role (replace with real auth logic)
const getCurrentUserRole = () => {
  // Example: return "admin" | "owner" | "manager" | "resident"
  return typeof window !== "undefined" ? localStorage.getItem("role") || "resident" : "resident"
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [userRole, setUserRole] = useState(getCurrentUserRole())
  const [darkMode, setDarkMode] = useState(theme === "dark")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  // Dialog state for feature buttons
  const [featureDialog, setFeatureDialog] = useState({ open: false, title: '', description: '' });

  const openFeatureDialog = (title, description) => {
    setFeatureDialog({ open: true, title, description });
  };

  const handleThemeToggle = (checked) => {
    setDarkMode(checked)
    setTheme(checked ? "dark" : "light")
  }

  const openPasswordDialog = () => {
    setShowPasswordDialog(true)
    setPasswordForm({ current: "", new: "", confirm: "" })
    setPasswordError("")
    setPasswordSuccess("")
  }

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordError("All fields are required.")
      return
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("New passwords do not match.")
      return
    }
    setIsPasswordLoading(true)
    // Simulate API call (replace with AppWrite integration later)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsPasswordLoading(false)
    setPasswordSuccess("Password changed successfully!")
    setPasswordForm({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black py-8 px-4 flex justify-center">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-background text-foreground">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              <span className="sr-only">Back</span>
            </Button>
            <SettingsIcon className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-2xl text-foreground">Settings</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-300">Manage your account and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {/* Universal Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><UserCog className="w-5 h-5 text-blue-500" /> Appearance</h3>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              <Label htmlFor="dark-mode" className="text-foreground">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </div>
          <Separator className="bg-border dark:bg-gray-700" />

          {/* Password Reset/Change */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><User className="w-5 h-5 text-blue-500" /> Password</h3>
            <Button variant="outline" onClick={openPasswordDialog} className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><KeyIcon className="w-4 h-4" /> Change Password</Button>
          </div>
          <Separator className="bg-border dark:bg-gray-700" />

          {/* Role-based Settings */}
          {userRole === "admin" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><Users className="w-5 h-5 text-blue-500" /> Admin Settings</h3>
              <p className="text-muted-foreground dark:text-gray-300">Manage platform-wide settings, approve owners, and oversee all PGs.</p>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Owner Approvals', 'This will take you to the owner approval workflow.')}> <UserCheck className="w-4 h-4" /> Go to Owner Approvals</Button>
            </div>
          )}
          {userRole === "owner" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><Home className="w-5 h-5 text-blue-500" /> Owner Settings</h3>
              <p className="text-muted-foreground dark:text-gray-300">Invite managers, manage your PG properties, and view analytics.</p>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Invite Manager', 'This will open the manager invitation workflow.')}> <UserPlus className="w-4 h-4" /> Invite Manager</Button>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Manage Properties', 'This will take you to the property management page.')}> <List className="w-4 h-4" /> Manage Properties</Button>
            </div>
          )}
          {userRole === "manager" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><UserCog className="w-5 h-5 text-blue-500" /> Manager Settings</h3>
              <p className="text-muted-foreground dark:text-gray-300">Onboard residents, manage services, and view resident lists.</p>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Onboard Residents', 'This will open the resident onboarding workflow.')}> <UserPlus className="w-4 h-4" /> Onboard Residents</Button>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('View Resident List', 'This will take you to the resident list page.')}> <List className="w-4 h-4" /> View Resident List</Button>
            </div>
          )}
          {userRole === "resident" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2 text-foreground"><UserCog className="w-5 h-5 text-blue-500" /> Resident Settings</h3>
              <p className="text-muted-foreground dark:text-gray-300">Update your profile, manage notifications, and view payment history.</p>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Edit Profile', 'This will open the profile editing workflow.')}> <User className="w-4 h-4" /> Edit Profile</Button>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('Notification Preferences', 'This will open the notification preferences workflow.')}> <Bell className="w-4 h-4" /> Notification Preferences</Button>
              <Button variant="outline" className="flex items-center gap-2 bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => openFeatureDialog('View Payment History', 'This will take you to the payment history page.')}> <CreditCard className="w-4 h-4" /> View Payment History</Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-md bg-background text-foreground dark:bg-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-muted-foreground dark:text-gray-300">Enter your current password and choose a new one.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordForm.current}
                onChange={e => handlePasswordChange("current", e.target.value)}
                required
                className="bg-background text-foreground dark:bg-gray-800 dark:text-white border dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.new}
                onChange={e => handlePasswordChange("new", e.target.value)}
                required
                className="bg-background text-foreground dark:bg-gray-800 dark:text-white border dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-foreground">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirm}
                onChange={e => handlePasswordChange("confirm", e.target.value)}
                required
                className="bg-background text-foreground dark:bg-gray-800 dark:text-white border dark:border-gray-700"
              />
            </div>
            {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
            {passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
            <DialogFooterUI>
              <Button variant="outline" type="button" onClick={() => setShowPasswordDialog(false)} className="bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">
                Cancel
              </Button>
              <Button type="submit" disabled={isPasswordLoading} className="bg-blue-600 text-white hover:bg-blue-700">
                {isPasswordLoading ? "Changing..." : "Change Password"}
              </Button>
            </DialogFooterUI>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feature Dialog for role-based actions */}
      <Dialog open={featureDialog.open} onOpenChange={open => setFeatureDialog({ ...featureDialog, open })}>
        <DialogContent className="max-w-md bg-background text-foreground dark:bg-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle>{featureDialog.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground dark:text-gray-300">{featureDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center text-muted-foreground dark:text-gray-300">
            <p>This feature is coming soon or will be connected to the backend.</p>
          </div>
          <DialogFooterUI>
            <Button variant="outline" onClick={() => setFeatureDialog({ ...featureDialog, open: false })} className="bg-background dark:bg-gray-900 text-foreground border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Close</Button>
          </DialogFooterUI>
        </DialogContent>
      </Dialog>
    </div>
  )
} 