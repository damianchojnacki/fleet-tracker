import Navigation from '@/components/Layouts/Navigation'
import { SWRConfig } from 'swr'

export interface AppLayoutProps {
    header: React.ReactNode
    children: React.ReactNode
    fallback?: { [key: string]: any }
}

const AppLayout = ({ header, children, fallback = {} }: AppLayoutProps) => {
    return (
        <SWRConfig
            value={{
                fallback,
                revalidateIfStale: false,
                revalidateOnFocus: false,
            }}
        >
            <div className="min-h-screen bg-gray-100">
                <Navigation />

                {/* Page Heading */}
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>
            </div>
        </SWRConfig>
    )
}

export default AppLayout
