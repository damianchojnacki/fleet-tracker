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
import Organization from '@/lib/api/Organization'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/router'
import OrganizationInvitation from '@/lib/api/OrganizationInvitation'
import ErrorBag from '@/types/ErrorBag'

const AssociateOrganization = () => {
  const { user, refresh, logout } = useAuth({
    middleware: 'auth',
  })

  const [name, setName] = useState('')
  const [errors, setErrors] = useState<ErrorBag>({})

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (user && user.organization_id) {
      router.push('/dashboard')
    }
  }, [user])

  useEffect(() => {
    (async () => {
      if (router.query.id && router.query.signature) {
        try {
          await OrganizationInvitation.accept({
            id: Number(router.query.id),
            signature: String(router.query.signature),
          })

          refresh()

          toast({
            variant: 'success',
            title: 'Oh yeah! That worked.',
            description: 'Joined organization',
          })
        } catch (error) {
          if (error.response?.status === 422) {
            setErrors(error.response.data.errors)

            return
          }

          if (error.response?.data?.message) {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: error.response.data.message,
            })

            return
          }

          throw error
        }
      }
    })()
  }, [router.query])

  const submitForm = async (event) => {
    event.preventDefault()

    try {
      await Organization.create({ name })

      refresh()

      toast({
        variant: 'success',
        title: 'Oh yeah! That worked.',
        description: 'Organization created',
      })
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors)

        return
      }

      if (error.response?.data?.message) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
        })

        return
      }

      throw error
    }
  }

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
          It looks like you don't have an organization assigned to your account.
          Please ask your organization administrator to invite you to their organization or
          create your own.
        </div>

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="name">Organization name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={name}
              className="block mt-1 w-full"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.name} className="mt-2" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button className="w-full sm:w-auto" variant="secondary" type="button" onClick={() => logout()}>Logout</Button>

            <Button className="w-full sm:w-auto">Create</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default AssociateOrganization
