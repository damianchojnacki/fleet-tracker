import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import ChatMessage from '@/lib/api/ChatMessage'

export const useChat = () => {
    const { user } = useAuth()

    const { data: messages, refetch: mutate } = useQuery({
        queryKey: [ChatMessage.path, user?.id],
        queryFn: () => user ? ChatMessage.index() : [],
        refetchInterval: 10000,
    })

    return {
        messages: messages ?? [],
        refresh: mutate,
    }
}
