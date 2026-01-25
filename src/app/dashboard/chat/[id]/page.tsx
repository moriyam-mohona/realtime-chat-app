import { notFound } from "next/navigation"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { mockUsers } from "@/lib/data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params
  const friend = mockUsers.find((f) => f.id === id)

  if (!friend) {
    return notFound()
  }

  return <ChatWindow friend={friend} />
}
