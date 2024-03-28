import { useQuery } from '@tanstack/react-query'
import Trip from '@/lib/api/Trip'
import { useAuth } from '@/hooks/useAuth'

export const useTrip = () => {
    const { user } = useAuth()

    const { data: trips, refetch: mutate } = useQuery({
        queryKey: [Trip.path, user?.id],
        queryFn: () => user?.id ? Trip.index() : null,
    })

    return {
      trips,
      refresh: mutate,
    }
}
