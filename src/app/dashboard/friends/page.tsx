import { FriendsList } from "@/components/friends/FriendsList"

export default function FriendsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Active Friends</h2>
       </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-4">
                <FriendsList />
            </div>
       </div>
    </div>
  )
}
