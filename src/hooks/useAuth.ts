import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import User from '@/lib/api/User'
import RegisterPayload from '@/types/Payloads/RegisterPayload'
import LoginPayload from '@/types/Payloads/LoginPayload'
import ForgotPasswordPayload from '@/types/Payloads/ForgotPasswordPayload'
import ResetPasswordPayload from '@/types/Payloads/ResetPasswordPayload'
import VerifyEmailPayload from '@/types/Payloads/VerifyEmailPayload'
import { useToast } from '@/components/ui/use-toast'
import * as Sentry from '@sentry/nextjs'
import RegisterResponse from '@/types/Responses/RegisterResponse'
import LoginResponse from '@/types/Responses/LoginResponse'
import ForgotPasswordResponse from '@/types/Responses/ForgotPasswordResponse'
import ResetPasswordResponse from '@/types/Responses/ResetPasswordResponse'
import ResendEmailVerificationResponse from '@/types/Responses/ResendEmailVerificationResponse'
import VerifyEmailResponse from '@/types/Responses/VerifyEmailResponse'
import ErrorBag from '@/types/ErrorBag'
import { AxiosError } from 'axios'
import { deleteCookie, setCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import UserType from '@/types/Models/User'

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

    const [errors, setErrors] = useState<ErrorBag>({})
    const [status, setStatus] = useState<string|null>(null)

    const { data: user, error, refetch: mutate } = useQuery<UserType | null, AxiosError>({
        queryKey: [User.showPath],
        queryFn: () => User.show()
            .then((user) => {
                if (user?.id) {
                    Sentry.setUser({ id: user.id })
                }

                return user
            })
            .catch((error: AxiosError) => {
                if (error.response?.status === 409) {
                    router.push('/verify-email')

                    return null
                }

                if(error.response?.status === 401) {
                    // eslint-disable-next-line no-console
                    console.warn('Unauthenticated.')
                }

                throw error
            }),
    })

    useEffect(() => {
        if(error?.response?.data.errors) {
            setErrors(error?.response?.data.errors)
        }
    }, [error])

    const handleResponseError = (error: AxiosError) => {
        if (error.response?.data?.message || error.message) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: error.response?.data.message ?? error.message,
            })

            Sentry.captureException(error)

            return
        }

        throw error
    }

    const register = async ({ ...props }: RegisterPayload) => {
        setErrors({})

        axios
            .post<RegisterResponse>('/api/register', props)
            .then((res) => {
                if (res.data.token) {
                    setCookie('token', res.data.token)
                }

                location.assign('/dashboard')
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ ...props }: LoginPayload) => {
        setErrors({})

        axios
            .post<LoginResponse>('/api/login', props)
            .then((res) => {
                if (res.data.token) {
                    setCookie('token', res.data.token)
                }

                location.assign('/dashboard')
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const forgotPassword = async ({ email }: ForgotPasswordPayload) => {
        setErrors({})
        setStatus(null)

        axios
            .post<ForgotPasswordResponse>('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const resetPassword = async ({ ...props }: ResetPasswordPayload) => {
        setErrors({})
        setStatus(null)

        axios
            .post<ResetPasswordResponse>('/api/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)

                    return
                }

                handleResponseError(error)
            })
    }

    const resendEmailVerification = () => {
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
                    variant: 'success',
                    title: 'Oh yeah! That worked.',
                    description: response.data.status,
                })
            })
            .catch(error => handleResponseError(error))
    }

    const logout = async () => {
        if (!error) {
            await axios.delete<object>('/api/logout').then(() => {
                deleteCookie('token')

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

        if (middleware === 'auth' && error && error.response?.status !== 409) {
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
        errors,
        status,
    }
}
