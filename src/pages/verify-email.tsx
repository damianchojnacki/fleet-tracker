import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import { Button } from '@/components/ui/button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const VerifyEmail = () => {
    const { logout, resendEmailVerification, verifyEmail, status } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const { query } = useRouter()

    useEffect(() => {
        if(query.id && query.hash && query.signature) {
            verifyEmail({
                id: String(query.id),
                hash: String(query.hash),
                signature: String(query.signature),
            })
        }
    }, [query])

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-muted-foreground" />
                    </Link>
                }
            >
                <div className="mb-4 text-sm text-muted-foreground">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                <div className="mt-4 flex items-center justify-between">
                    {status ? (
                        <div className="font-medium text-sm text-success">
                            {status}
                        </div>
                    ) : (
                        <Button
                            onClick={() => resendEmailVerification()}
                        >
                            Resend Verification Email
                        </Button>
                    )}

                    <button
                        type="button"
                        className="underline text-sm text-muted-foreground hover:text-foreground"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default VerifyEmail
