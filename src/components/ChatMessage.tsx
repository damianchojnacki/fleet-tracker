import ChatMessageType from '@/types/Models/ChatMessage'
import { useAuth } from '@/hooks/useAuth'

const ChatMessage = (props: ChatMessageType) => {
    const {user} = useAuth()

    return (
        <div className={`${user?.id === props.author_id ? 'items-end' : 'items-start'} flex flex-col gap-2 p-4 whitespace-pre-wrap`}>
            <span className={`bg-accent p-3 rounded-md max-w-xs`}>
              {props.content}
            </span>
        </div>
    )
}

export default ChatMessage
