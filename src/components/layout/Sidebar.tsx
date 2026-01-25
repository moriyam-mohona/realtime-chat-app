"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Users, UserPlus, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { currentUser } from "@/lib/data"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    { href: "/dashboard", label: "Chats", icon: MessageSquare },
    { href: "/dashboard/friends", label: "Friends", icon: Users },
    { href: "/dashboard/requests", label: "Requests", icon: UserPlus },
  ]

  return (
    <div className="hidden h-screen w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
           <LayoutDashboard className="h-6 w-6" />
           <span className="">Chat Professional</span>
        </Link>
        <div className="ml-auto">
             <ThemeToggle />
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
         <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routes.map((route) => (
                <Link
                   key={route.href}
                   href={route.href}
                   className={cn(
                       "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                       pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground"
                   )}
                >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                </Link>
            ))}
         </nav>
      </div>
       <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 mb-4">
              <img src={currentUser.avatar} alt="Avatar" className="h-9 w-9 rounded-full" />
              <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground max-w-[150px] truncate">{currentUser.email}</span>
              </div>
          </div>
          <Link
                   href="/"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
          </Link>
       </div>
    </div>
  )
}
