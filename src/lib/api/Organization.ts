import CreateOrganizationPayload from '@/types/Payloads/CreateOrganizationPayload'
import axios from '@/lib/axios'
import { AxiosResponse } from 'axios'

export default class Organization
{
    public static create(payload: CreateOrganizationPayload): Promise<Organization|AxiosResponse<Organization>>
    {
        return axios.post<Organization>('/api/user/organizations', payload)
            .then((res) => res.data)
    }
}
