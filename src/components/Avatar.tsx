import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

export function UserAvatar({ initials }) {
  return (
    <Avatar className="mx-3">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className="bg-[#1B4865] text-white">{initials}</AvatarFallback>
    </Avatar>
  )
}
