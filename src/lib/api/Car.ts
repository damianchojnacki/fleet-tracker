import axios from '@/lib/axios'
import CarType from '@/types/Models/Car'

export default class Car
{
    public static path: string = '/api/cars'
    public static pathUserCars: string = '/api/user/cars'

    public static index(): Promise<CarType[]>
    {
        return axios.get<CarType[]>(`${Car.path}`)
            .then((res) => res.data)
    }

    public static show(id: number): Promise<CarType>
    {
        return axios.get<CarType>(`${Car.path}/${id}`)
            .then((res) => res.data)
    }
    
    public static select(id: number): Promise<CarType>
    {
        return axios.put<CarType>(`${Car.pathUserCars}/${id}`)
            .then((res) => res.data)
    }

    public static imageUrl(car: CarType): string
    {
        const url = new URL('https://cdn.imagin.studio/getImage')

        url.searchParams.set('customer', 'hrjavascript-mastery')
        url.searchParams.set('make', car.brand?.name ?? '')
        url.searchParams.set('modelFamily', car.specs.model ?? '')
        url.searchParams.set('color', car.specs.color ?? '')
        url.searchParams.set('angle', '1')
        url.searchParams.set('zoomType', 'fullscreen')
        url.searchParams.set('width', '1280')

        return url.toString()
    }
}
