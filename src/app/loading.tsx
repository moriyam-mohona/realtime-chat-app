import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row bg-background">
      {/* Sidebar Skeleton */}
      <div className="hidden w-64 flex-col border-r bg-card md:flex p-4 gap-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
        <div className="space-y-2 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col p-4 md:p-8 gap-6 animate-pulse">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
        <div className="flex-1 border rounded-xl p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <Skeleton className={`h-12 ${i % 2 === 0 ? 'w-1/2' : 'w-1/3'} rounded-lg`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
