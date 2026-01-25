import { CreateGroupDialog } from "@/components/chat/CreateGroupDialog"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 glass-card animate-fade-in">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <svg className="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight">
          Select a chat to start messaging
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          You can chat with friends or create a new group.
        </p>
        <CreateGroupDialog />
      </div>
    </div>
  )
}
