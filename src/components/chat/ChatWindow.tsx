"use client"
import * as React from "react"
import { Phone, Video, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { ChatInput } from "@/components/chat/ChatInput"
import { User, currentUser } from "@/lib/data"

// Mock message type
interface Message {
  id: string
  content: string
  createdAt: string
  senderId: string
}

export function ChatWindow({ friend }: { friend: User }) {
  const [messages, setMessages] = React.useState<Message[]>([
     { id: '1', content: 'Hey there!', createdAt: new Date().toISOString(), senderId: friend.id },
     { id: '2', content: 'Hello! How are you?', createdAt: new Date().toISOString(), senderId: currentUser.id }
  ])

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      createdAt: new Date().toISOString(),
      senderId: currentUser.id
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="flex flex-col h-full">
       <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
             <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
             </div>
             <div className="flex flex-col">
                <span className="font-semibold">{friend.name}</span>
                <span className="text-xs text-muted-foreground">{friend.status}</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
             <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
             <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
          </div>
       </div>
       <div className="flex-1 overflow-auto p-4 space-y-4">
           {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
           ))}
       </div>
       <div className="mt-auto">
          <ChatInput onSend={handleSend} />
       </div>
    </div>
  )
}
