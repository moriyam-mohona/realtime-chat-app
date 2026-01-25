"use client"

import * as React from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { mockRequests } from "@/lib/data"

export function RequestList() {
  const [requests, setRequests] = React.useState(mockRequests)

  const handleAccept = (id: string) => {
    console.log("Accepted request:", id)
    setRequests((prev) => prev.filter((req) => req.id !== id))
  }

  const handleDecline = (id: string) => {
    console.log("Declined request:", id)
    setRequests((prev) => prev.filter((req) => req.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Friend Requests</CardTitle>
        <CardDescription>
          Manage your incoming friend requests.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending friend requests.
          </p>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <img
                    src={request.from.avatar}
                    alt={request.from.name}
                    className="h-10 w-10 rounded-full object-cover"
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
                >
                  <X className="mr-2 h-4 w-4" />
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAccept(request.id)}
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
