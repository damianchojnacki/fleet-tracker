import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/useAuth'
import ErrorBag from '@/types/ErrorBag'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import InputError from '@/components/InputError'


function LoginForm() {
  const router = useRouter()

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [shouldRemember, setShouldRemember] = React.useState(false)
  const [errors, setErrors] = React.useState<ErrorBag>({})

  const { toast } = useToast()

  React.useEffect(() => {
    if ((router?.query?.reset?.length ?? 0) > 0) {
      const status = (atob(String(router.query.reset ?? '')))
      if (status) {
        toast({
          variant: 'success',
          title: 'Oh yeah! That worked.',
          description: status,
        })
        router.replace('/login')
      }
    }
  }, [router?.query?.reset])

  const submitSignInForm = async event => {
    event.preventDefault()
    await login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
    })
  }

  return (
    <TabsContent value="account">
      <Card className="w-full border-secondary text-primary-foreground">
        <form onSubmit={submitSignInForm}>
          <CardHeader>
            <CardDescription className="font-semibold">Enter your email address and password to Sign In</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="font-semibold">Email address*</Label>
                <Input type="email" value={email} id="email" placeholder="example@fleet-tracker.com" className="border-secondary  " onChange={event => setEmail(event.target.value)} required autoFocus />
                <InputError messages={errors.email} className="mt-2" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework" className="font-semibold">Password*</Label>
                <Input type="password" value={password} required autoComplete="current-password" id="password" placeholder="password" className="border-secondary" onChange={event => setPassword(event.target.value)} />
                <InputError messages={errors.password} className="mt-2" />
              </div>
            </div>
            <div className="flex items-center my-2 sm:mb-0 mr-auto sm:w-full">
              <Checkbox id="remember_me" name="remember" onChange={() => setShouldRemember(!shouldRemember)} />
              <Label htmlFor="remember_me" className="ml-2 text-sm text-muted-foreground cursor-pointer">
                Remember me
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="min-w-full font-semibold">Sign In</Button>
          </CardFooter>
        </form>
      </Card>
    </TabsContent>
  )
}

export default LoginForm
