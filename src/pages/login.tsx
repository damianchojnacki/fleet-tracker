import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import { Button } from '@/components/ui/button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import ErrorBag from '@/types/ErrorBag'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<ErrorBag>({})

    const { toast } = useToast()

    useEffect(() => {
        if ((router?.query?.reset?.length ?? 0) > 0) {
            const status = (atob(String(router.query.reset ?? '')))

            if(status) {
                toast({
                    variant: 'success',
                    title: 'Oh yeah! That worked.',
                    description: status,
                })

                router.replace('/login')
            }
        }
    }, [router?.query?.reset])

    const submitForm = async event => {
        event.preventDefault()

        await login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
        })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }
            >

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />

                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />

                        <InputError
                            messages={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4 flex-wrap">
                        <div className="flex items-center mb-5 sm:mb-0 mr-auto sm:w-full">
                            <Checkbox
                                id="remember_me"
                                name="remember"
                                onChange={() => setShouldRemember(!shouldRemember)}
                            />

                            <Label
                                htmlFor="remember_me"
                                className="ml-2 text-sm text-gray-600 cursor-pointer"
                            >
                                Remember me
                            </Label>
                        </div>

                        <Link
                            href="/forgot-password"
                            className="underline text-sm text-gray-600 hover:text-gray-900 mb-5 sm:mb-0 self-end sm:self-auto"
                        >
                            Forgot your password?
                        </Link>

                        <Button className="sm:ml-3 w-full sm:w-auto">Login</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
