import axios from '@/lib/axios'
import ChatMessageType from '@/types/Models/ChatMessage'
import CreateChatMessagePayload from '@/types/Payloads/CreateChatMessagePayload'

export default class ChatMessage
{
    public static path: string = '/api/user/chat-messages'

    public static index(): Promise<ChatMessageType[]>
    {
        return axios.get<ChatMessageType[]>(`${ChatMessage.path}`)
            .then((res) => res.data)
    }

    public static create(payload: CreateChatMessagePayload): Promise<ChatMessageType>
    {
        return axios.post<ChatMessageType>(`${ChatMessage.path}`, payload)
            .then((res) => res.data)
    }
}
