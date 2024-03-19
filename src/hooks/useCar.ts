import { useQuery } from '@tanstack/react-query'
import Car from '@/lib/api/Car'
import { useAuth } from '@/hooks/useAuth'

export const useCar = () => {
    // const { toast } = useToast()

    const { user } = useAuth()


    const { data: car, refetch: mutate } = useQuery({
        queryKey: [Car.path, user?.id],
        queryFn: () => user?.car_id ? Car.show(user?.car_id) : null,
    })

    // const handleResponseError = (error: AxiosError) => {
    //     if (error.response?.data?.message || error.message) {
    //         toast({
    //             variant: 'destructive',
    //             title: 'Uh oh! Something went wrong.',
    //             description: error.response?.data.message ?? error.message,
    //         })
    //
    //         Sentry.captureException(error)
    //
    //         return
    //     }
    //
    //     throw error
    // }
    //
    // type setErrors = { setErrors: Dispatch<SetStateAction<ErrorBag>> }
    //
    // type setStatus = { setStatus: Dispatch<SetStateAction<string|null>> }

    return {
        car,
        refresh: mutate,
    }
}
