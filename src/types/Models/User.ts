import Organization from "@/types/Models/Organization"

export default interface User
{
    id: number
    car_id: number | null
    organization_id: number | null
    firstname: string
    lastname: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
    organization?: Organization | null
}
