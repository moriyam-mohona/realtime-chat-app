"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Phone, Video, Info, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { MessageBubble } from "@/components/chat/MessageBubble"
import { ChatInput } from "@/components/chat/ChatInput"
import { TypingIndicator } from "@/components/chat/TypingIndicator"
import { Skeleton } from "@/components/ui/skeleton"
import { GroupInfoPanel } from "@/components/chat/GroupInfoPanel"
import { User, currentUser, Conversation } from "@/lib/data"

interface ChatWindowProps {
  friend?: User
  group?: Conversation
}

// Mock message type
interface Message {
  id: string
  content: string
  createdAt: string
  senderId: string
  senderName?: string
}

export function ChatWindow({ friend, group }: ChatWindowProps) {
  const router = useRouter()
  const [messages, setMessages] = React.useState<Message[]>(() => [
     { id: '1', content: 'Hey there!', createdAt: new Date(Date.now() - 3600000).toISOString(), senderId: friend?.id || 'u2', senderName: friend?.name || 'Sarah Smith' },
     { id: '2', content: 'Hello! How are you?', createdAt: new Date(Date.now() - 1800000).toISOString(), senderId: currentUser.id }
  ])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isTyping, setIsTyping] = React.useState(false)
  const [showInfo, setShowInfo] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [friend?.id, group?.id])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const name = group ? group.name : friend?.name
  const avatar = group ? group.avatar : friend?.avatar
  const status = friend?.status || (group ? `${group.participants.length} members` : '')

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: text,
      createdAt: new Date().toISOString(),
      senderId: currentUser.id
    }
    setMessages([...messages, newMessage])
    
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: group ? "This is a team update." : "Got it, thanks!",
        createdAt: new Date().toISOString(),
        senderId: group ? group.participants[1].id : (friend?.id || 'u2'),
        senderName: group ? group.participants[1].name : friend?.name
      }
      setMessages(prev => [...prev, replyMessage])
    }, 2000)
  }

  return (
    <div className="flex h-full w-full overflow-hidden animate-fade-in">
      <div className="flex flex-col flex-1 min-w-0">
         <div className="flex items-center justify-between border-b p-4 glass shadow-sm z-10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.back()}>
                  <ArrowLeft className="h-4 w-4" />
               </Button>
               <div className="relative">
                  <img src={avatar} alt={name} className="h-10 w-10 rounded-xl object-cover ring-2 ring-background shadow-sm" />
                  {!group && (
                    <span className={cn(
                        "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background border",
                        friend?.status === "online" ? "bg-green-500 animate-pulse-slow" : friend?.status === "busy" ? "bg-red-500" : "bg-gray-400"
                    )} />
                  )}
               </div>
               <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm truncate">{name}</span>
                  <span className="text-[10px] text-muted-foreground capitalize truncate">{status}</span>
               </div>
            </div>
            <div className="flex items-center gap-1">
               {!group && (
                 <>
                   <Button variant="ghost" size="icon" className="h-9 w-9 transition-all duration-200 hover:scale-110 active:scale-95 text-muted-foreground hover:text-primary">
                     <Phone className="h-4 w-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-9 w-9 transition-all duration-200 hover:scale-110 active:scale-95 text-muted-foreground hover:text-primary">
                     <Video className="h-4 w-4" />
                   </Button>
                 </>
               )}
               <Button 
                variant={showInfo ? "secondary" : "ghost"} 
                size="icon" 
                className="h-9 w-9 transition-all duration-200 hover:scale-110 active:scale-95 text-muted-foreground hover:text-primary"
                onClick={() => setShowInfo(!showInfo)}
               >
                 <Info className="h-4 w-4" />
               </Button>
            </div>
         </div>
         
         <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6 scrollbar-thin bg-gradient-to-b from-transparent to-muted/5">
             {isLoading ? (
               <div className="space-y-6">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                     <div className="flex flex-col gap-2 max-w-[70%]">
                        {i % 2 !== 0 && <Skeleton className="h-3 w-16" />}
                        <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-64' : 'w-48'} rounded-2xl`} />
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <>
                 {messages.map((msg, idx) => (
                    <div key={msg.id} className="flex flex-col">
                        {group && msg.senderId !== currentUser.id && (
                            <span className="text-[10px] font-bold text-muted-foreground ml-2 mb-1">
                                {msg.senderName}
                            </span>
                        )}
                        <MessageBubble message={msg} isCurrentUser={msg.senderId === currentUser.id} />
                    </div>
                 ))}
                 {isTyping && <TypingIndicator />}
                 <div ref={messagesEndRef} />
               </>
             )}
         </div>
         
         <div className="mt-auto border-t glass p-2">
            <ChatInput onSend={handleSend} />
         </div>
      </div>

      {showInfo && group && (
        <GroupInfoPanel group={group} onClose={() => setShowInfo(false)} />
      )}
    </div>
  )
}


