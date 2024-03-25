import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const Dropdown = ({
  trigger,
  children,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 mr-12 bg-primary text-white font-semibold border-secondary">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
