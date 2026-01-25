"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { Users } from "lucide-react"

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
import { mockRequests } from "@/lib/data"

export function RequestList() {
  const [requests, setRequests] = React.useState(mockRequests)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleAccept = (id: string) => {
    console.log("Accepted request:", id)
    setRequests((prev) => prev.filter((req) => req.id !== id))
  }

  const handleDecline = (id: string) => {
    console.log("Declined request:", id)
    setRequests((prev) => prev.filter((req) => req.id !== id))
  }

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Friend Requests</CardTitle>
          <CardDescription>
            Manage your incoming friend requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Friend Requests</CardTitle>
        <CardDescription>
          Manage your incoming friend requests.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {requests.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No pending requests"
            description="You don't have any friend requests at the moment."
          />
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between space-x-4 p-3 rounded-lg glass-hover animate-slide-in"
            >
              <div className="flex items-center space-x-4">
                <img
                    src={request.from.avatar}
                    alt={request.from.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
                />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {request.from.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {request.from.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDecline(request.id)}
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAccept(request.id)}
                  className="transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
