"use client"

import * as React from "react"
import { Users, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"
import { mockUsers, currentUser } from "@/lib/data"

export function CreateGroupDialog() {
  const [open, setOpen] = React.useState(false)
  const [groupName, setGroupName] = React.useState("")
  const [selectedFriends, setSelectedFriends] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const friends = mockUsers.filter(u => u.id !== currentUser.id)

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleCreate = async () => {
    setIsLoading(true)
    console.log("Create Group:", { groupName, selectedFriends })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setOpen(false)
    setGroupName("")
    setSelectedFriends([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="transition-all duration-200 hover:scale-105 active:scale-95">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-card">
        <DialogHeader>
          <DialogTitle>Create Group Chat</DialogTitle>
          <DialogDescription>
            Start a new group chat with your friends.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Cool Group"
              className="col-span-3 transition-all duration-200 focus:scale-[1.01]"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="grid gap-4">
             <Label>Select Friends</Label>
             <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto scrollbar-thin">
                {friends.map((friend) => (
                    <div 
                      key={friend.id} 
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
                    >
                        <Checkbox
                            id={friend.id}
                            checked={selectedFriends.includes(friend.id)}
                            onCheckedChange={() => handleFriendToggle(friend.id)}
                        />
                        <label
                            htmlFor={friend.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2 flex-1"
                        >
                            <img 
                              src={friend.avatar} 
                              alt={friend.name} 
                              className="h-6 w-6 rounded-full" 
                            />
                            {friend.name}
                        </label>
                    </div>
                ))}
             </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleCreate} 
            disabled={!groupName || selectedFriends.length === 0 || isLoading}
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
