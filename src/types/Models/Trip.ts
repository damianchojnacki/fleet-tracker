import Car from '@/types/Models/Car'
import TripPoint from '@/types/Models/TripPoint'

export default interface Trip {
  id: number
  car_id: number
  user_id: number
  distance: number
  is_finished: boolean
  note: string | null
  from: string | null
  to: string | null
  starts_at: string | null
  points: TripPoint[]
  car: Car
}

