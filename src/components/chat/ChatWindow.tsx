"use client"
import * as React from "react"
import { Phone, Video, MoreVertical } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { ChatInput } from "@/components/chat/ChatInput"
import { TypingIndicator } from "@/components/chat/TypingIndicator"
import { Skeleton } from "@/components/ui/skeleton"
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
  const [isLoading, setIsLoading] = React.useState(true)
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      createdAt: new Date().toISOString(),
      senderId: currentUser.id
    }
    setMessages([...messages, newMessage])
    
    // Simulate friend typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message!",
        createdAt: new Date().toISOString(),
        senderId: friend.id
      }
      setMessages(prev => [...prev, replyMessage])
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
       <div className="flex items-center justify-between border-b p-4 glass-card">
          <div className="flex items-center gap-4">
             <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-background" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background animate-pulse-slow" />
             </div>
             <div className="flex flex-col">
                <span className="font-semibold">{friend.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{friend.status}</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110 active:scale-95">
               <Phone className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110 active:scale-95">
               <Video className="h-4 w-4" />
             </Button>
             <Button variant="ghost" size="icon" className="transition-all duration-200 hover:scale-110 active:scale-95">
               <MoreVertical className="h-4 w-4" />
             </Button>
          </div>
       </div>
       
       <div className="flex-1 overflow-auto p-4 space-y-4 scrollbar-thin">
           {isLoading ? (
             <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                   <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'} rounded-lg`} />
                 </div>
               ))}
             </div>
           ) : (
             <>
               {messages.map(msg => (
                  <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
               ))}
               {isTyping && <TypingIndicator />}
               <div ref={messagesEndRef} />
             </>
           )}
       </div>
       
       <div className="mt-auto border-t">
          <ChatInput onSend={handleSend} />
       </div>
    </div>
  )
}
