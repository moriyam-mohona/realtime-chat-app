"use client"

import * as React from "react"
import { Users, Info, UserPlus, Shield } from "lucide-react"
import { Conversation, mockUsers } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface GroupInfoPanelProps {
  group: Conversation
  onClose: () => void
}

export function GroupInfoPanel({ group, onClose }: GroupInfoPanelProps) {
  return (
    <div className="w-80 border-l glass-card h-full flex flex-col p-6 overflow-auto animate-fade-in scrollbar-thin">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">Group Info</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Info className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={group.avatar}
          alt={group.name}
          className="h-24 w-24 rounded-2xl object-cover shadow-lg border-2 border-background ring-4 ring-primary/10 mb-4 transition-transform hover:scale-105 duration-300"
        />
        <h4 className="text-xl font-bold">{group.name}</h4>
        <p className="text-xs text-muted-foreground mt-1">
          {group.participants.length} members
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
            Description
          </Label>
          <p className="text-sm text-balance leading-relaxed">
            {group.description || "No description provided."}
          </p>
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Members
            </Label>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <UserPlus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {group.participants.map((user, idx) => (
              <div key={user.id} className="flex items-center gap-3 group/member">
                <div className="relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border"
                    />
                    <span className={cn(
                        "absolute bottom-0 right-0 h-2 w-2 rounded-full ring-1 ring-background",
                        user.status === "online" ? "bg-green-500" : "bg-gray-400"
                    )} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user.name}</p>
                    {idx === 0 && <span className="text-[9px] text-primary font-bold">Admin</span>}
                </div>
                {idx === 0 && <Shield className="h-3 w-3 text-primary opacity-0 group-hover/member:opacity-100 transition-opacity" />}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="pt-2">
            <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive flex items-center gap-2">
                Leave Group
            </Button>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-xs font-medium", className)}>{children}</span>
}

import { cn } from "@/lib/utils"
