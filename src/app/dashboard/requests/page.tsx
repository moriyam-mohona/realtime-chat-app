"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestList } from "@/components/friends/RequestList"
import { FindPeople } from "@/components/friends/FindPeople"
import { UserPlus, Send, Search } from "lucide-react"

export default function RequestsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 md:p-4 lg:p-6 max-w-5xl mx-auto w-full">
       <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manage Relations
            </h1>
            <p className="text-muted-foreground text-sm">
                Connect with colleagues, handle incoming requests, and discover new people.
            </p>
       </div>

       <Tabs defaultValue="incoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card h-12 p-1">
                <TabsTrigger value="incoming" className="gap-2 transition-all duration-200">
                    <UserPlus className="h-4 w-4" />
                    Incoming
                </TabsTrigger>
                <TabsTrigger value="sent" className="gap-2 transition-all duration-200">
                    <Send className="h-4 w-4" />
                    Sent
                </TabsTrigger>
                <TabsTrigger value="find" className="gap-2 transition-all duration-200">
                    <Search className="h-4 w-4" />
                    Find People
                </TabsTrigger>
            </TabsList>
            
            <TabsContent value="incoming" className="focus-visible:outline-none">
                <RequestList type="incoming" />
            </TabsContent>
            
            <TabsContent value="sent" className="focus-visible:outline-none">
                <RequestList type="sent" />
            </TabsContent>
            
            <TabsContent value="find" className="focus-visible:outline-none">
                <FindPeople />
            </TabsContent>
       </Tabs>
    </div>
  )
}
