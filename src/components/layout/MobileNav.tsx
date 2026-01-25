"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, MessageSquare, Users, UserPlus, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { SettingsDialog } from "./SettingsDialog"
import { cn } from "@/lib/utils"
import { currentUser } from "@/lib/data"

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/dashboard", label: "Chats", icon: MessageSquare },
    { href: "/dashboard/friends", label: "Friends", icon: Users },
    { href: "/dashboard/requests", label: "Requests", icon: UserPlus },
  ]

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b glass-card">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ChatPro
          </span>
        </div>
        <div className="flex items-center gap-2">
          <SettingsDialog />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-[57px] z-50 glass-card animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                  pathname === route.href
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border border-primary/20 shadow-sm"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                )}
              >
                <route.icon className="h-5 w-5" />
                <span className="font-medium">{route.label}</span>
              </Link>
            ))}
            
            <div className="mt-auto pt-4 border-t">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 mb-3">
                <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full ring-2 ring-background"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
                </div>
              </div>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-muted/50"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
