import { useAuth } from '@/hooks/useAuth'

const Welcome = () => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="p-6 bg-white border-b border-gray-200">
            Welcome {user?.firstname}!
        </div>
    )
}

export default Welcome
