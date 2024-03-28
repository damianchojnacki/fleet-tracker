import ChatMessage from '@/components/ChatMessage'
import { useChat } from '@/hooks/useChat'
import { useEffect, useRef } from 'react'
import ChatInput from '@/components/ChatInput'

const Chat = () => {
    const { messages } = useChat()
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
        }
    }, [messages])

    return (
        <>
            <div className='w-full overflow-y-auto overflow-x-hidden h-[50vh] md:h-[55vh] flex flex-col'
                 ref={chatContainerRef}
            >
                {messages.map((message) => (
                    <ChatMessage key={message.id} {...message} />
                ))}
            </div>

            <ChatInput />
        </>
    )
}

export default Chat
