import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

export function UserAvatar({ initials }) {
  return (
    <Avatar className="mx-3">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback className="bg-primary text-white">{initials}</AvatarFallback>
    </Avatar>
  )
}
