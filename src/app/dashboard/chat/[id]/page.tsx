import { notFound } from "next/navigation"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { mockFriends } from "@/lib/data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params
  const friend = mockFriends.find((f) => f.id === id)

  if (!friend) {
    return notFound()
  }

  return <ChatWindow friend={friend} />
}
