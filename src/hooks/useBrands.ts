import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'

export const useBrands = () => {
    // const { toast } = useToast()

    const { data: brands, refetch: mutate } = useQuery({
        queryKey: ['api/cars/brands'],
        queryFn: () => axios.get('/api/cars/brands').then((res) => res.data),
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
        brands,
        refresh: mutate,
    }
}
