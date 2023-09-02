import {useAuth} from "@/hooks/useAuth"
import {act, renderHook, waitFor} from "@testing-library/react"
import axios from "@/lib/axios"

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('useAuth', function () {
    it('user should be undefined by default', async () => {
        const { result } = renderHook(() => useAuth())

        expect(result.current.user).toBe(undefined)
    })

    it('should return correct user', async () => {
        const user = {
            id: 1,
            email: "user@example.com",
            email_verified_at: '2023-09-01T16:18:21.719Z',
        };

        const mock = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: user })

        const { result } = renderHook(() => useAuth())

        await waitFor(() => {
            expect(mock).toHaveBeenCalledTimes(1)
        })

        await waitFor(() => {
            expect(result.current.user).toBe(user)
        })
    })
})
