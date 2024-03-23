import React, { useState } from 'react'
import InputError from '@/components/InputError'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import ErrorBag from '@/types/ErrorBag'
import { useAuth } from '@/hooks/useAuth'
import AuthSessionStatus from '@/components/AuthSessionStatus'

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

    if(!email) {
        return
    }

    forgotPassword({ email, setErrors, setStatus })
  }

  return (
    <TabsContent value="password">
      <Card className="w-full border-secondary text-primary-foreground">
        <form onSubmit={submitForgotPasswordForm}>
          <CardHeader>
            <CardDescription className="font-semibold">Please enter your email address and we’ll send you instructions on to how to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="font-semibold">Email address*</Label>
                <Input name="email" type="email" value={email} id="email" placeholder="example@fleet-tracker.com" className="border-secondary" onChange={event => setEmail(event.target.value)} required autoFocus />
                <InputError messages={errors.email} className="mt-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {!status ? (
              <Button className="min-w-full font-semibold">Submit</Button>
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
