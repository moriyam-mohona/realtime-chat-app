"use client"

import * as React from "react"
import { Check, X, UserPlus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { mockRequests, FriendRequest } from "@/lib/data"

interface RequestListProps {
  type: "incoming" | "sent"
}

export function RequestList({ type }: RequestListProps) {
  const [requests, setRequests] = React.useState<FriendRequest[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Filter and simulate loading
    const filtered = mockRequests.filter(req => 
      type === "incoming" ? req.status === "pending" : req.status === "sent"
    )
    setRequests(filtered)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [type])

  const handleAction = (id: string, action: "accept" | "decline" | "cancel") => {
    console.log(`${action} request:`, id)
    setRequests((prev) => prev.filter((req) => req.id !== id))
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 glass-card animate-pulse">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 mt-4 animate-fade-in">
      {requests.length === 0 ? (
        <EmptyState
          icon={type === "incoming" ? UserPlus : Clock}
          title={type === "incoming" ? "No incoming requests" : "No sent requests"}
          description={type === "incoming" 
            ? "You don't have any friend requests at the moment." 
            : "Requests you've sent to others will appear here."}
        />
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between p-4 glass-card glass-hover border border-transparent hover:border-border/50 transition-all duration-300 rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                  src={request.from.avatar}
                  alt={request.from.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-background border"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold">{request.from.name}</span>
                    <Badge variant="secondary" className="text-[10px] h-4">
                        {type === "incoming" ? "Pending" : "Sent"}
                    </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{request.from.email}</span>
                <span className="text-[10px] text-muted-foreground mt-1">
                    {new Date(request.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {type === "incoming" ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(request.id, "decline")}
                    className="transition-all duration-200 hover:scale-105 active:scale-95 border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Decline</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAction(request.id, "accept")}
                    className="transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Check className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Accept</span>
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(request.id, "cancel")}
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <X className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Cancel Request</span>
                </Button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
