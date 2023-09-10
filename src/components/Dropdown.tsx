import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const Dropdown = ({
    trigger,
    children,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

            <DropdownMenuContent className="mr-12">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown
