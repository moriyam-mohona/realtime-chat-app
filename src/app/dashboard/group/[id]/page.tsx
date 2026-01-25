import { notFound } from "next/navigation"
import { ChatWindow } from "@/components/chat/ChatWindow"
import { mockConversations } from "@/lib/data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function GroupChatPage({ params }: PageProps) {
  const { id } = await params
  const group = mockConversations.find((c) => c.id === id && c.type === "group")

  if (!group) {
    return notFound()
  }

  return <ChatWindow group={group} />
}
