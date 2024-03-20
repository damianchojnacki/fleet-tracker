export default interface Trip {
  id: number
  car_id: number
  user_id: number
  distance: number
  is_finished: boolean
  note: string | null
  from: string
  created_at: string | null
  updated_at: string | null
}
