"use client"

import * as React from "react"
import { MessageSquare, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { SearchInput } from "@/components/ui/search-input"
import { mockFriends } from "@/lib/data"

export function FriendsList() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleChat = (id: string) => {
    router.push(`/dashboard/chat/${id}`)
  }

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Friends</CardTitle>
          <CardDescription>
            Your connected friends list.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Skeleton className="h-10 w-full" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>
          Your connected friends list.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <SearchInput 
          placeholder="Search friends..." 
          onSearch={setSearchQuery}
        />
        
        {filteredFriends.length === 0 ? (
          <EmptyState
            icon={UserPlus}
            title={searchQuery ? "No friends found" : "No friends yet"}
            description={searchQuery ? "Try a different search term." : "Start by accepting friend requests or inviting people to connect."}
          />
        ) : (
          filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between space-x-4 p-3 rounded-lg glass-hover animate-slide-in"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
                  />
                  <span 
                    className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${
                      friend.status === 'online' 
                        ? 'bg-green-500 animate-pulse-slow' 
                        : friend.status === 'busy' 
                        ? 'bg-red-500' 
                        : 'bg-gray-500'
                    }`} 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{friend.name}</p>
                  <p className="text-sm text-muted-foreground">{friend.email}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleChat(friend.id)}
                className="transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
