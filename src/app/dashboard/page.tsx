import { CreateGroupDialog } from "@/components/chat/CreateGroupDialog"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Select a chat or start a new one
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          You can chat with friends or create a new group.
        </p>
        <CreateGroupDialog />
      </div>
    </div>
  )
}
