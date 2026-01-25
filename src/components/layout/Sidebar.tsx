"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Users, UserPlus, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { SettingsDialog } from "./SettingsDialog"
import { ConversationList } from "@/components/chat/ConversationList"
import { currentUser } from "@/lib/data"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    { href: "/dashboard", label: "Chats", icon: MessageSquare },
    { href: "/dashboard/friends", label: "Friends", icon: Users },
    { href: "/dashboard/requests", label: "Requests", icon: UserPlus },
  ]

  return (
    <div className="hidden h-screen w-64 flex-col md:flex glass-card border-r">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold transition-all duration-200 hover:scale-105">
           <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
             <LayoutDashboard className="h-5 w-5 text-white" />
           </div>
           <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             ChatPro
           </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
             <SettingsDialog />
             <ThemeToggle />
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
         <div className="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Conversations
         </div>
         <ConversationList />
      </div>
      
      <div className="mt-auto border-t">
         <nav className="grid items-start px-4 py-3 gap-1">
            {routes.map((route) => (
                <Link
                   key={route.href}
                   href={route.href}
                   className={cn(
                       "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                       pathname === route.href 
                         ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-primary border border-primary/20 shadow-sm" 
                         : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                   )}
                >
                    <route.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{route.label}</span>
                </Link>
            ))}
         </nav>
      </div>
      
       <div className="mt-auto border-t p-4 glass">
          <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer">
              <img 
                src={currentUser.avatar} 
                alt="Avatar" 
                className="h-9 w-9 rounded-full ring-2 ring-background shadow-sm" 
              />
              <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{currentUser.email}</span>
              </div>
          </div>
          <Link
                   href="/"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:text-primary hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
          </Link>
       </div>
    </div>
  )
}
