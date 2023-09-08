import CreateOrganizationPayload from "@/types/Payloads/CreateOrganizationPayload"
import axios from "@/lib/axios"
import {AxiosResponse} from "axios"
import AcceptOrganizationInvitationPayload from "@/types/Payloads/AcceptOrganizationInvitationPayload"

export default class OrganizationInvitation
{
    public static accept({id, signature}: AcceptOrganizationInvitationPayload): Promise<AxiosResponse>
    {
        return axios.put(`/api/organization-invitations/${id}?signature=${signature}`)
            .then((res) => res.data)
    }
}
