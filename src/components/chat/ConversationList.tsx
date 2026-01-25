"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { mockConversations, Conversation, currentUser } from "@/lib/data"
import { SearchInput } from "@/components/ui/search-input"

export function ConversationList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const filteredConversations = mockConversations.filter(conv => {
    const name = conv.type === "group" 
      ? conv.name 
      : conv.participants.find(p => p.id !== currentUser.id)?.name
    
    return name?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleSelect = (id: string, type: "direct" | "group") => {
    if (type === "group") {
        router.push(`/dashboard/group/${id}`)
    } else {
        const friend = mockConversations.find(c => c.id === id)?.participants.find(p => p.id !== currentUser.id)
        if (friend) {
            router.push(`/dashboard/chat/${friend.id}`)
        }
    }
  }

  return (
    <div className="flex flex-col gap-4 overflow-hidden h-full">
      <div className="px-4 pt-1">
        <SearchInput 
          placeholder="Search chats..." 
          onSearch={setSearchQuery}
          className="w-full"
        />
      </div>
      
      <div className="flex-1 overflow-auto px-2 scrollbar-thin">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No chats found
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conv) => {
              const otherUser = conv.type === "direct" 
                ? conv.participants.find(p => p.id !== currentUser.id)
                : null
              const name = conv.type === "group" ? conv.name : otherUser?.name
              const avatar = conv.type === "group" ? conv.avatar : otherUser?.avatar
              const status = conv.type === "direct" ? otherUser?.status : null
              
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelect(conv.id, conv.type)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 glass-hover group border border-transparent hover:border-border/50"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={avatar}
                      alt={name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-background shadow-sm transition-transform duration-200 group-hover:scale-105"
                    />
                    {status && (
                       <span className={cn(
                         "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-background border",
                         status === "online" ? "bg-green-500 animate-pulse-slow" : status === "busy" ? "bg-red-500" : "bg-gray-400"
                       )} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-sm truncate">{name}</span>
                      {conv.lastMessage && (
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(conv.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between gap-2">
                       <p className="text-xs text-muted-foreground truncate flex-1">
                         {conv.lastMessage ? conv.lastMessage.content : "No messages yet"}
                       </p>
                       {conv.unreadCount > 0 && (
                         <div className="bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shrink-0 animate-fade-in shadow-sm">
                            {conv.unreadCount}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
