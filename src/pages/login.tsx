import AuthCard from '@/components/AuthCard'
import GuestLayout from '@/components/Layouts/GuestLayout'
import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import LoginForm from '@/components/LoginForm'

const Login = () => {
  return (
    <GuestLayout>
      <AuthCard logo={
        <Link href="/">
          <ApplicationLogo className="w-32 h-32 fill-current text-muted-foreground" />
        </Link>
      }
      >
        <Tabs defaultValue="account" className="w-full text-primary-foreground">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="account" className="font-semibold">Account</TabsTrigger>
            <TabsTrigger value="password" className="font-semibold">Password</TabsTrigger>
          </TabsList>
          <LoginForm />
          <ForgotPasswordForm />
        </Tabs>
      </AuthCard>
    </GuestLayout >
  )
}

export default Login
