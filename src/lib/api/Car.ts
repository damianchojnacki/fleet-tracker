import axios from '@/lib/axios'
import CarType from '@/types/Models/Car'

export default class Car
{
    public static show(id: number): Promise<CarType>
    {
        return axios.get<CarType>(`/api/cars/${id}`)
            .then((res) => res.data)
    }
}
