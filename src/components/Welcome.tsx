import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'

const Welcome = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className='py-4 px-6 border-b flex items-center mb-2'>
            Welcome {user?.firstname ?? <Skeleton className='w-16 h-4 rounded-full ml-1' />}!
        </div>
    )
}

export default Welcome
