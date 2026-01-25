export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 px-4 py-2">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
      </div>
      <span className="text-xs text-muted-foreground">typing...</span>
    </div>
  )
}
