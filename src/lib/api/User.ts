import axios from '@/lib/axios'
import UserType from '@/types/Models/User'

export default class User
{
    public static showPath: string = '/api/user'

    public static show(): Promise<UserType>
    {
        return axios.get<UserType>(User.showPath)
            .then((res) => res.data)
    }
}
