import { useQuery } from '@tanstack/react-query'
import Car from '@/lib/api/Car'
import { useAuth } from '@/hooks/useAuth'

export const useCar = () => {
    const { user } = useAuth()

    const { data: car, refetch: refreshCar } = useQuery({
        queryKey: [Car.path, user?.car_id],
        queryFn: () => user?.car_id ? Car.show(user?.car_id) : null,
    })

    const { data: availableCars, refetch: refreshAvailableCars } = useQuery({
        queryKey: [Car.path],
        queryFn: () => Car.index(),
    })

    return {
        car,
        availableCars,
        refreshCar,
        refreshAvailableCars,
    }
}
