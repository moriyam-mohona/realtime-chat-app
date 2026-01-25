import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: {
    id: string
    content: string
    createdAt: string
    senderId: string
  }
  isCurrentUser: boolean
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  return (
    <div
      className={cn(
        "flex w-full animate-slide-in",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[75%] rounded-lg px-4 py-2 text-sm shadow-sm transition-all duration-200 hover:shadow-md",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p className="break-words">{message.content}</p>
        <span className={cn(
          "text-xs self-end",
          isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {time}
        </span>
      </div>
    </div>
  )
}
