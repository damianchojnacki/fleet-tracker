import {FC, ReactNode} from "react"

export interface AuthCardProps {
    logo: ReactNode
    children: ReactNode
}

const AuthCard: FC<AuthCardProps> = ({ logo, children }) => (
    <div className="w-full flex flex-col sm:justify-center items-center py-6 bg-gray-100">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
