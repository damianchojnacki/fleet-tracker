import React, { useState } from 'react'
import InputError from './InputError'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { TabsContent } from './ui/tabs'
import ErrorBag from '@/types/ErrorBag'
import { useAuth } from '@/hooks/useAuth'
import AuthSessionStatus from './AuthSessionStatus'

function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<ErrorBag>({})
  const [status, setStatus] = useState<string | null>(null)

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const submitForgotPasswordForm = async event => {
    event.preventDefault()
    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <TabsContent value="password">
      <Card className="w-full border-secondary">
        <form onSubmit={submitForgotPasswordForm}>
          <CardHeader>
            <CardDescription className="text-primary font-semibold">Please enter your email address and we’ll send you instructions on to how to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-primary font-semibold">Email address*</Label>
                <Input type="email" value={email} id="email" placeholder="example@fleet-tracker.com" className="border-secondary  " onChange={event => setEmail(event.target.value)} required autoFocus />
                <InputError messages={errors.email} className="mt-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!status ? (
              <Button className="min-w-full text-white font-semibold bg-primary hover:bg-[#1B4865]/[0.8]">Submit</Button>
            ) : (
              <AuthSessionStatus className="mb-4" status={status} />
            )}
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  )
}

export default ForgotPasswordForm
