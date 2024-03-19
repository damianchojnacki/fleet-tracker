import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface AppLayoutProps {
  header?: React.ReactNode
  children: React.ReactNode
}

const AppLayout = ({ header, children }: AppLayoutProps) => {
  const { user } = useAuth({ middleware: 'auth' })
  const router = useRouter()

  useEffect(() => {
    if (user && !user.organization_id) {
      router.push('/associate-organization')
    }
  }, [user])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Heading */}
      {header ? (
        <header className="bg-secondary shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8">
            {header}
          </div>
        </header>
      ) : null}

      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}

export default AppLayout
