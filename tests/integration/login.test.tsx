import { render, screen } from '@testing-library/react'
import Login from '@/pages/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

jest.mock('axios')

describe('login', () => {
    it('form should be visible', () => {
        const client = new QueryClient()

        render(
            <QueryClientProvider client={client}>
                <Login />
            </QueryClientProvider>
        )

        expect(screen.getByText('Email')).toBeVisible()
        expect(screen.getByText('Password')).toBeVisible()
        expect(screen.getByText('Login')).toBeVisible()
        expect(screen.getByText('Forgot your password?')).toBeVisible()
    })

    // it('should redirect to dashboard if authenticated', () => {
    //     const user = {
    //         id: 1,
    //         email: "user@example.com",
    //         email_verified_at: '2023-09-01T16:18:21.719Z',
    //     };
    //
    //     axios.get.mockImplementation(() => Promise.resolve(user));
    //
    //     render(<Login />)
    //
    //     expect(screen.getByText('Dashboard')).toBeVisible()
    // })
})
