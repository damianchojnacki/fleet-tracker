import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import User from "@/types/Models/User"
import RegisterPayload from "@/types/Payloads/RegisterPayload"
import LoginPayload from "@/types/Payloads/LoginPayload"
import ForgotPasswordPayload from "@/types/Payloads/ForgotPasswordPayload"
import ResetPasswordPayload from "@/types/Payloads/ResetPasswordPayload"
import VerifyEmailPayload from "@/types/Payloads/VerifyEmailPayload"
import {useToast} from "@/components/ui/use-toast"

export interface useAuthProps {
    middleware?: 'guest' | 'auth'
    redirectIfAuthenticated?: string
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
}: useAuthProps = {}) => {
    const router = useRouter()

    const { toast } = useToast()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get<User>('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
        {
            shouldRetryOnError: false,
        }
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const handleResponseError = (error: any) => {
        if (error.response.data.message) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response.data.message,
            })

            return
        }

        throw error
    }

    type setErrors = { setErrors: (errors: any[]) => void }

    const register = async ({ setErrors, ...props }: RegisterPayload & setErrors) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type setStatus = { setStatus: (status: any) => void }

    const login = async ({ setErrors, ...props }: LoginPayload & setErrors) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordPayload & setErrors & setStatus) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: ResetPasswordPayload & setErrors & setStatus) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/api/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const resendEmailVerification = ({ setStatus }: setStatus) => {
        axios
            .post('/api/email/verification-notification')
            .then(response => setStatus(response.data.status))
            .catch(error => handleResponseError(error))
    }

    const verifyEmail = ({ id, hash, signature }: VerifyEmailPayload) => {
        axios
            .post(`/api/verify-email/${id}/${hash}?signature=${signature}`)
            .then(response => {
                router.push('/dashboard')

                toast({
                    variant: "success",
                    title: "Oh yeah! That worked.",
                    description: response.data.status,
                })
            })
            .catch(error => handleResponseError(error))
    }

    const logout = async () => {
        if (!error) {
            await axios.delete('/api/logout').then(() => mutate())
        }

        window.location.assign('/login')
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user){
            router.push(redirectIfAuthenticated)
        }

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at &&
            redirectIfAuthenticated
        ) {
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && error) {
            logout()
        }
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        verifyEmail,
        logout,
        refresh: mutate,
    }
}
