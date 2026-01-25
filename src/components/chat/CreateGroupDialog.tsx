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
import { mockFriends } from "@/lib/data"

export function CreateGroupDialog() {
  const [open, setOpen] = React.useState(false)
  const [groupName, setGroupName] = React.useState("")
  const [selectedFriends, setSelectedFriends] = React.useState<string[]>([])

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleCreate = () => {
    console.log("Create Group:", { groupName, selectedFriends })
    // Simulate backend call
    setOpen(false)
    setGroupName("")
    setSelectedFriends([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              className="col-span-3"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className="grid gap-4">
             <Label>Select Friends</Label>
             <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                {mockFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={friend.id}
                            checked={selectedFriends.includes(friend.id)}
                            onCheckedChange={() => handleFriendToggle(friend.id)}
                        />
                        <label
                            htmlFor={friend.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {friend.name}
                        </label>
                    </div>
                ))}
             </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={!groupName || selectedFriends.length === 0}>Create Group</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
