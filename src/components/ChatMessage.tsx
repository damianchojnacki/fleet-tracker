import ChatMessageType from '@/types/Models/ChatMessage'
import { useAuth } from '@/hooks/useAuth'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const ChatMessage = (props: ChatMessageType) => {
    const { user } = useAuth()

    return (
        <div
            className={`${user?.id === props.author_id ? 'items-end' : 'items-start'} flex flex-col gap-2 p-4 whitespace-pre-wrap`}
            data-cy='message'
        >
            <TooltipProvider>
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <span className='bg-accent p-3 rounded-md max-w-xs'>
                            {props.content}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side='bottom' align={user?.id === props.author_id ? 'end' : 'start'}>
                        {props.author.firstname} {props.author.lastname} o {new Date(props.created_at).toLocaleString()}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}

export default ChatMessage
