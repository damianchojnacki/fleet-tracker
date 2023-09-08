import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import {Button} from '@/components/ui/button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import {Input} from '@/components/ui/input'
import InputError from '@/components/InputError'
import {Label} from '@/components/ui/label'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import {useEffect, useState} from 'react'
import Organization from "@/lib/api/Organization"
import {AxiosError} from "axios"
import {useToast} from "@/components/ui/use-toast"
import {useRouter} from "next/router"

const AssociateOrganization = () => {
    const { user } = useAuth({
        middleware: 'auth',
    })

    const [name, setName] = useState('')
    const [errors, setErrors] = useState<any>([])

    const {toast} = useToast()
    const router = useRouter()

    useEffect(() => {
        if(user && user.organization_id){
            router.push('/dashboard')
        }
    }, [user])

    const submitForm = async (event) => {
        event.preventDefault()

        try {
            await Organization.create({ name })

            router.push('/dashboard')

            toast({
                variant: "success",
                title: "Oh yeah! That worked.",
                description: "Organization created",
            })
        } catch(error) {
            if(error.response?.status === 422){
                setErrors(error.response.data.errors)

                return
            }

            if (error.response?.data?.message) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
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
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <div className="mb-4 text-sm text-gray-600">
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

                    <div className="flex items-center justify-end mt-4">
                        <Button className="w-full sm:w-auto">Create</Button>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default AssociateOrganization
