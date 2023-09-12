import CreateOrganizationPayload from '@/types/Payloads/CreateOrganizationPayload'
import axios from '@/lib/axios'
import OrganizationType from '@/types/Models/Organization'

export default class Organization
{
    public static create(payload: CreateOrganizationPayload): Promise<OrganizationType>
    {
        return axios.post<OrganizationType>('/api/user/organizations', payload)
            .then((res) => res.data)
    }
}
