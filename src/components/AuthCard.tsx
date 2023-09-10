import { FC, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export interface AuthCardProps {
    logo: ReactNode
    children: ReactNode
}

const AuthCard: FC<AuthCardProps> = ({ logo, children }) => (
    <div className="w-full flex flex-col justify-end sm:justify-center items-center pt-6 sm:pb-6 bg-gray-100">
        <div className="flex-grow sm:flex-grow-0 flex items-center sm:mb-6">{logo}</div>

        <Card className="w-full sm:max-w-md pt-4 overflow-hidden rounded-t-3xl sm:rounded-lg">
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </div>
)

export default AuthCard
