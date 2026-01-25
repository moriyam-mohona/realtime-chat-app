"use client"
import * as React from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatInputProps {
  onSend: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = React.useState("")

  const handleSend = () => {
    if (input.trim()) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <div className="flex w-full items-center gap-2 p-4">
      <Button 
        type="button" 
        size="icon" 
        variant="ghost"
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <Paperclip className="h-4 w-4" />
        <span className="sr-only">Attach file</span>
      </Button>
      
      <Input
        id="message"
        placeholder="Type your message..."
        className="flex-1 transition-all duration-200 focus:scale-[1.01]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
      />
      
      <Button 
        type="button" 
        size="icon" 
        variant="ghost"
        className="transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <Smile className="h-4 w-4" />
        <span className="sr-only">Add emoji</span>
      </Button>
      
      <Button 
        type="submit" 
        size="icon" 
        onClick={handleSend}
        disabled={!input.trim()}
        className="transition-all duration-200 hover:scale-110 active:scale-95 disabled:scale-100"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  )
}
