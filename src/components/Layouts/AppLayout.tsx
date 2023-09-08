import Navigation from '@/components/Layouts/Navigation'
import {useAuth} from '@/hooks/useAuth'
import {useEffect} from "react"
import { useRouter } from 'next/router'

const AppLayout = ({ header, children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    const router = useRouter()

    useEffect(() => {
        if(user && !user.organization_id){
            router.push('/associate-organization')
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
