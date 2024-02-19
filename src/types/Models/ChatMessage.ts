export default interface ChatMessage
{
    id: number
    user_id: number
    author_id: number
    content: string
    created_at: string
    author: {
        id: string
        firstname: string
        lastname: string
    }
    user: {
        id: string
        firstname: string
        lastname: string
    } | null
}
