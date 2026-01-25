export type User = {
  id: string
  name: string
  email: string
  avatar: string
  status: "online" | "offline" | "busy"
}

export const currentUser: User = {
  id: "u1",
  name: "Alex Developer",
  email: "alex@example.com",
  avatar: "https://github.com/shadcn.png",
  status: "online",
}

export type FriendRequest = {
  id: string
  from: User
  status: "pending" | "accepted" | "rejected" | "sent"
  timestamp: string
}

export type Message = {
  id: string
  content: string
  senderId: string
  timestamp: string
}

export type Conversation = {
  id: string
  name?: string
  avatar?: string
  type: "direct" | "group"
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  description?: string
}

export const mockUsers: User[] = [
  {
    id: "u2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "online",
  },
  {
    id: "u3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    status: "offline",
  },
  {
    id: "u4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "online",
  },
  {
    id: "u5",
    name: "Chris Wilson",
    email: "chris@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "busy",
  },
  {
    id: "u6",
    name: "David Brown",
    email: "david@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "offline",
  },
]

export const mockRequests: FriendRequest[] = [
  {
    id: "r1",
    from: mockUsers[0],
    status: "pending",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "r2",
    from: mockUsers[1],
    status: "pending",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "r3",
    from: mockUsers[4],
    status: "sent",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  }
]

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    type: "direct",
    participants: [currentUser, mockUsers[0]],
    unreadCount: 3,
    lastMessage: {
      id: "m1",
      content: "Hey, are you coming to the meeting?",
      senderId: "u2",
      timestamp: new Date(Date.now() - 600000).toISOString(),
    }
  },
  {
    id: "c2",
    type: "direct",
    participants: [currentUser, mockUsers[2]],
    unreadCount: 0,
    lastMessage: {
      id: "m2",
      content: "The design looks great!",
      senderId: "u1",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    }
  },
  {
    id: "g1",
    type: "group",
    name: "Project Team",
    description: "Design and development discussions for the new app.",
    participants: [currentUser, mockUsers[0], mockUsers[1], mockUsers[3]],
    unreadCount: 5,
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
    lastMessage: {
      id: "m3",
      content: "Chris added a new file to the drive.",
      senderId: "u5",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    }
  }
]
