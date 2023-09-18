import { useAuth } from '@/hooks/useAuth'
import { renderHook, waitFor } from '@testing-library/react'
import nock from 'nock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('useAuth', function () {
    it('user should be undefined by default', async () => {
        const queryClient = new QueryClient()

        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )

        nock(process.env.NEXT_PUBLIC_API_URL ?? '')
            .get('/api/user')
            .reply(401, { message: 'Unauthenticated.' })

        const { result } = renderHook(() => useAuth(), { wrapper })

        expect(result.current.user).toBe(undefined)
    })

    it('should return correct user', async () => {
        const user = {
            id: 1,
            email: 'user@example.com',
            email_verified_at: '2023-09-01T16:18:21.719Z',
        }

        nock(process.env.NEXT_PUBLIC_API_URL ?? '')
            .get('/api/user')
            .reply(200, user)

        const queryClient = new QueryClient()

        const wrapper = ({ children }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )

        const { result } = renderHook(() => useAuth(), { wrapper })

        await waitFor(() => expect(result.current.user).toStrictEqual(user))
    })
})
