import { FC, ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export interface AuthCardProps {
  children: ReactNode,
  logo: ReactNode
}

const AuthCard: FC<AuthCardProps> = ({ logo, children }) => (
  <div className="w-full flex flex-col justify-center items-center py-6 px-1 m-5 md:m-0">
    <div className="flex-grow-0 flex items-center mb-6">{logo}</div>

    <Card className="w-full max-w-md min-w-[300px] pt-4 overflow-hidden rounded-t-3xl rounded-b-none rounded-lg">
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </div>
)

export default AuthCard
