"use client"

import * as React from "react"
import { Settings, Bell, User, Palette } from "lucide-react"
import { useTheme } from "next-themes"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function SettingsDialog() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = React.useState(true)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your chat experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="theme" className="text-base font-medium">Theme</Label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="transition-all duration-200 hover:scale-105"
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="transition-all duration-200 hover:scale-105"
              >
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="transition-all duration-200 hover:scale-105"
              >
                System
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="notifications" className="text-base font-medium">Notifications</Label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Enable desktop notifications
              </span>
              <Button
                variant={notifications ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(!notifications)}
                className="transition-all duration-200 hover:scale-105"
              >
                {notifications ? "On" : "Off"}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <Label className="text-base font-medium">Profile</Label>
            </div>
            <Button 
              variant="outline" 
              className="w-full transition-all duration-200 hover:scale-[1.02]"
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
