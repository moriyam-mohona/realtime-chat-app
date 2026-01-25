"use client"

import * as React from "react"
import { Search, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/ui/search-input"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"
import { mockUsers, currentUser } from "@/lib/data"

export function FindPeople() {
  const [query, setQuery] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState(mockUsers.filter(u => u.id !== currentUser.id))

  const handleSearch = React.useCallback((val: string) => {
    if (val === query && results.length > 0) return // Skip redundant searches
    
    setQuery(val)
    setIsLoading(true)
    
    // Simulate search delay
    const timer = setTimeout(() => {
        const filtered = mockUsers.filter(u => 
            u.id !== currentUser.id && 
            (u.name.toLowerCase().includes(val.toLowerCase()) || u.email.toLowerCase().includes(val.toLowerCase()))
        )
        setResults(filtered)
        setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [query, results.length])

  const handleSendRequest = (id: string) => {
    console.log("Sending request to:", id)
    // Local state update simulation
  }

  return (
    <div className="space-y-6 mt-4 animate-fade-in">
        <div className="glass-card p-4 rounded-xl shadow-sm">
            <SearchInput 
                placeholder="Search people by name or email..." 
                onSearch={handleSearch}
                className="w-full"
            />
        </div>

        {isLoading ? (
            <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 glass-card animate-pulse">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                        </div>
                        <Skeleton className="h-9 w-24" />
                    </div>
                ))}
            </div>
        ) : results.length === 0 ? (
            <EmptyState 
                icon={Search}
                title="No people found"
                description={`We couldn't find anyone matching "${query}"`}
            />
        ) : (
            <div className="grid gap-4">
                {results.map(user => (
                    <div 
                        key={user.id}
                        className="flex items-center justify-between p-4 glass-card glass-hover border border-transparent hover:border-border/50 transition-all duration-300 rounded-xl shadow-sm"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-12 w-12 rounded-full object-cover ring-2 ring-background border"
                            />
                            <div>
                                <p className="text-sm font-semibold mb-0.5">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                        <Button 
                            size="sm" 
                            onClick={() => handleSendRequest(user.id)}
                            className="transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Connect
                        </Button>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}
