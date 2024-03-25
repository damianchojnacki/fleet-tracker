import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

const Welcome = () => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className="p-6 border-b flex items-center">
      Welcome {user?.firstname ?? <Skeleton className="w-16 h-4 rounded-full ml-1" />}!
    </div>
  )
}

export default Welcome
