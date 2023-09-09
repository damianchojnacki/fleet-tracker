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
import * as Sentry from "@sentry/nextjs";
import RegisterResponse from "@/types/Responses/RegisterResponse"
import LoginResponse from "@/types/Responses/LoginResponse"
import ForgotPasswordResponse from "@/types/Responses/ForgotPasswordResponse"
import ResetPasswordResponse from "@/types/Responses/ResetPasswordResponse"
import ResendEmailVerificationResponse from "@/types/Responses/ResendEmailVerificationResponse"
import VerifyEmailResponse from "@/types/Responses/VerifyEmailResponse"

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
            .then(res => {
                res.data.id && Sentry.setUser({id: res.data.id})

                return res.data
            })
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
        {
            shouldRetryOnError: false,
        }
    )

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
        setErrors([])

        axios
            .post<RegisterResponse>('/api/register', props)
            .then((res) => {
                res.data.token && localStorage.setItem('token', res.data.token)

                location.assign('/dashboard')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    type setStatus = { setStatus: (status: any) => void }

    const login = async ({ setErrors, ...props }: LoginPayload & setErrors) => {
        setErrors([])

        axios
            .post<LoginResponse>('/api/login', props)
            .then((res) => {
                res.data.token && localStorage.setItem('token', res.data.token)

                location.assign('/dashboard')
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordPayload & setErrors & setStatus) => {
        setErrors([])
        setStatus(null)

        axios
            .post<ForgotPasswordResponse>('/api/forgot-password', { email })
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
        setErrors([])
        setStatus(null)

        axios
            .post<ResetPasswordResponse>('/api/reset-password', { token: router.query.token, ...props })
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
            .post<ResendEmailVerificationResponse>('/api/email/verification-notification')
            .then(response => setStatus(response.data.status))
            .catch(error => handleResponseError(error))
    }

    const verifyEmail = ({ id, hash, signature }: VerifyEmailPayload) => {
        axios
            .post<VerifyEmailResponse>(`/api/verify-email/${id}/${hash}?signature=${signature}`)
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
            await axios.delete<{}>('/api/logout').then(() => {
                localStorage.removeItem('token')

                mutate()
            })
        }

        location.assign('/login')
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
