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
  status: "pending" | "accepted" | "rejected"
}

export const mockRequests: FriendRequest[] = [
  {
    id: "r1",
    from: {
      id: "u2",
      name: "Sarah Smith",
      email: "sarah@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      status: "online",
    },
    status: "pending",
  },
  {
    id: "r2",
    from: {
      id: "u3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      status: "offline",
    },
    status: "pending",
  },
]

export const mockFriends: User[] = [
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
]
