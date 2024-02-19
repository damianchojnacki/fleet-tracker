import { useAuth } from '@/hooks/useAuth'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Link from 'next/link'
import { SendHorizontal } from 'lucide-react'
import Organization from '@/lib/api/Organization'
import ChatMessage from '@/lib/api/ChatMessage'
import { useChat } from '@/hooks/useChat'
import { useToast } from '@/components/ui/use-toast'

const ChatInput = () => {
    const {user} = useAuth()
    const {refresh} = useChat()
    const [message, setMessage] = useState<string>('')
    const { toast } = useToast()

    const handleSend = async () => {
        if(!user) {
            return
        }

        try {
            await ChatMessage.create({
                user_id: user.id,
                content: message,
            })

            refresh()
        } catch(error) {
            if (error.response?.data?.message) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: error.response.data.message,
                })

                return
            }

            throw error
        }
    }

    return (
        <div className="flex gap-2 p-4 whitespace-pre-wrap items-center">
            <Textarea
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                placeholder="Aa"
                className="w-full border rounded-full flex items-center min-h-10 h-10 resize-none overflow-hidden bg-background"
            />
            <Link
                href="#"
                className={`${message.length > 3 ? 'translate-x-0 w-auto' : 'translate-x-10 w-0'} ml-2 transition duration-300 dark:text-muted-foreground dark:hover:text-white shrink-0`}
                onClick={handleSend}
            >
                <SendHorizontal size={20} className="text-muted-foreground" />
            </Link>
        </div>
    )
}

export default ChatInput
