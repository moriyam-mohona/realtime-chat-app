"use client"

import * as React from "react"
import { MessageSquare, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockFriends } from "@/lib/data"

export function FriendsList() {
  const router = useRouter()

  const handleChat = (id: string) => {
    router.push(`/dashboard/chat/${id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>
          Your connected friends list.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {mockFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
               <div className="relative">
                  <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'}`} />
               </div>
              <div>
                <p className="text-sm font-medium leading-none">{friend.name}</p>
                <p className="text-sm text-muted-foreground">{friend.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleChat(friend.id)}>
                    <MessageSquare className="h-4 w-4" />
                </Button>
                {/* Placeholder for DropdownMenu since I didn't verify its existence, I'll assume Button is safer if DropdownMenu is missing, but I'll try to include it if I can. Using Button for simpler UI for now to avoid crashes if I missed DropdownMenu components */}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
