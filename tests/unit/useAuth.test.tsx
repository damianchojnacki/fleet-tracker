import { useAuth } from '@/hooks/useAuth'
import { renderHook } from '@testing-library/react'
import * as SWR from 'swr'

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
            email: 'user@example.com',
            email_verified_at: '2023-09-01T16:18:21.719Z',
        }

        jest.spyOn(SWR, 'default').mockImplementationOnce(() => {
            return {
                data: user,
                error: undefined,
                mutate: jest.fn(),
                isValidating: false,
            }
        })

        const { result } = renderHook(() => useAuth())

        expect(SWR.default).toHaveBeenCalledTimes(1)
        expect(result.current.user).toBe(user)
    })
})
