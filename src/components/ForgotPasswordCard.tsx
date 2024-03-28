import * as React from 'react'
import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'

export default function ForgotPasswordCard() {
    return (
        <div className='w-full flex flex-col justify-end sm:justify-center items-center pt-6 sm:pb-6'>
            <div className='flex-grow sm:flex-grow-0 flex items-center sm:mb-6'>
                <Link href='/'>
                    <ApplicationLogo className='w-32 h-32 fill-current text-muted-foreground' />
                </Link>
            </div>
            <Card className='w-[400px] border-secondary text-primary-foreground'>
                <CardHeader>
                    <CardDescription className='font-semibold'>An email with a temporary password has been sent to your
                        email address. For security, we recommend changing your password after logging
                        in</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className='min-w-full font-semibold'>Go to Sign In form</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

