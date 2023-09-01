import {useAuth} from "@/hooks/useAuth"
import {renderHook} from "@testing-library/react"

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('useAuth', function () {
    it('user should be undefined by default', function () {
        const { result } = renderHook(() => useAuth())

        expect(result.current.user).toBe(undefined)
    })
})
