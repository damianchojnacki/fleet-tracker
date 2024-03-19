import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserAvatar } from './Avatar'

const Dropdown = ({
    trigger,
    children,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

            <DropdownMenuContent className="w-40 mr-12 bg-[#0f1729] text-white font-semibold border-secondary">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
